import React, { useEffect, useState } from "react"
import ReactDOM from "react-dom"

import MainPart from "./utils//PopupMain"

import "./utils/PopupMain.css"

const Popup = () => {
  const [url, setUrl] = useState<string>("")

  useEffect(() => {
    chrome.runtime.sendMessage("get-url", (response) => {
      setUrl(response)
    })
  }, [])

  return (
    <MainPart />
    //  <>
    //  <Provider store={store} >
    //  <MainPart/>
    //  </Provider>
    //  </>
  )
}

const root = document.createElement("div")
root.className = "starter"
document.body.appendChild(root)
ReactDOM.render(<Popup />, root)
