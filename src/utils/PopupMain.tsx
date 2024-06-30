import React, { useEffect, useState } from "react"

import "./PopupMain.css"

import BlockListForm from "./BlockListForm"
import { addToBlocklist, getBlocklist, removeFromBlocklist } from "./storage"

export default function PopupMain() {
  const [showPopup, setShowPopup] = useState(false)
  const [list, setList] = useState<string[]>([])
  const [isBlocked, setIsBlocked] = useState(false)

  const getBlocklist2 = async () => {
    const blocklist = await getBlocklist()
    setList(blocklist)

    getCurrentTabUrl().then((currentUrl) => {
      setIsBlocked(list.includes(currentUrl))
    })
  }

  const getCurrentTabUrl = (): Promise<string> => {
    return new Promise((resolve, reject) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log("hello")
        if (tabs.length === 0) {
          reject(new Error("No active tab found"))
        } else {
          const tab = tabs[0]
          console.log(new URL(tab.url!).hostname.toLowerCase())
          resolve(new URL(tab.url!).hostname.toLowerCase())
        }
      })
    })
  }

  useEffect(() => {
    getBlocklist2()

    const handleStorageChange = (
      changes: { [key: string]: chrome.storage.StorageChange },
      areaName: string
    ) => {
      if (areaName === "local" && changes.blocklist) {
        getBlocklist()
      }
    }

    chrome.storage.onChanged.addListener(handleStorageChange)

    return () => {
      chrome.storage.onChanged.removeListener(handleStorageChange)
    }
  }, [isBlocked, showPopup, list])

  const removingBlockedSites = async (currentUrl: string) => {
    await removeFromBlocklist(currentUrl)

    setList((prevList) => prevList.filter((item) => item !== currentUrl))

    const currentUrl1 = window.location.hostname.toLowerCase()
    const isBlocked = list.includes(currentUrl1)
    setIsBlocked(isBlocked)
  }

  const handleAddToBlocklist = () => {
    setShowPopup(true)
  }

  const handleCancel = () => {
    setShowPopup(false)
  }

  const handleAdd = async (url: string) => {
    await addToBlocklist(url)

    setList((prevList) => [...prevList, url])
    setShowPopup(false)

    const currentUrl = window.location.hostname.toLowerCase()
    setIsBlocked(url === currentUrl)
  }

  if (list.length > 0) {
    console.log(list)
    console.log(isBlocked)
  }
  return (
    <div className="main">
      {isBlocked ? (
        <div className="blinkit_light_red">
          <p>Access Denied !</p>
        </div>
      ) : (
        <div className="blinkit_light_green">
          <h3> Content Accessible !</h3>
        </div>
      )}

      <div className="show_blocked_site_list">
        {list.length > 0 ? (
          list.map((item) => (
            <div className="single_site" key={item}>
              <p>{item}</p>
              <button onClick={() => removingBlockedSites(item)}>X</button>
            </div>
          ))
        ) : (
          <>
            <h3>No site is blocked</h3>
          </>
        )}
      </div>

      {showPopup && <BlockListForm onAdd={handleAdd} onCancel={handleCancel} />}

      <div className="add_button">
        <button onClick={handleAddToBlocklist}>
          Addto block list
        </button>
      </div>
    </div>
  )
}
