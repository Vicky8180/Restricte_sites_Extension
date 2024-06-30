import React, { useEffect, useState } from "react"

import { getBlocklist } from "./utils/storage"

const BlockedWebsiteChecker: React.FC = () => {
  const [isBlocked, setIsBlocked] = useState(false)

  const checkBlockedWebsite = async () => {
    const blocklist = await getBlocklist()
    const currentUrl = window.location.hostname.toLowerCase()
    const isBlocked = blocklist.includes(currentUrl)
    setIsBlocked(isBlocked)
  }

  useEffect(() => {
    const handleBlocklistUpdate = (message) => {
      checkBlockedWebsite()
    }

    chrome.runtime.onMessage.addListener((message) => {
      if (message.type === "blocklistUpdated") {
        handleBlocklistUpdate(message)
      }
    })

    checkBlockedWebsite()

    return () => {
      // Clean up event listener
      chrome.runtime.onMessage.removeListener(handleBlocklistUpdate)
    }
  }, [])

  if (isBlocked) {
    const warningScreenStyle: React.CSSProperties = {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "red",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "24px",
      fontWeight: "bold",
      zIndex: 9999
    }

    return (
      <div style={warningScreenStyle}>
        <p>This website is blocked!</p>
      </div>
    )
  }

  return null
}

export default BlockedWebsiteChecker
