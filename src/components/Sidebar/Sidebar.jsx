

// AIzaSyAfl6UmmP0tPWpPBNKe-vWi5ZmaJJ24q2A

import React, { useContext, useState } from 'react'
import './Sidebar.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Sidebar = () => {

    const [extended, setExtended] = useState(false)

    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context)


    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt)
        await onSent(prompt)
    }


    return (
        <div className='sidebar'>

            <div className="top">

                <img onClick={() => setExtended(prev => !prev)} className='menu' src={assets.menuicon} alt="menu icon" />
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plusicon} alt="" />
                    {extended ? <p>New Chat</p> : null}
                </div>
                {extended
                    ?
                    <div className="recent">
                        <p className="recent-tittle">Recent</p>
                        {prevPrompts.map((item, index) => {
                            return (
                                <div onClick={() => loadPrompt(item)} className="recent-entry" key={index}>
                                    <img src={assets.arrow_icon} alt="" />
                                    <p>{item.slice(0, 18)} ...</p>
                                </div>

                            )

                        })}

                    </div> : null
                }

            </div>
            <div className="bottom">

                <div className="bootom-item recent-entry">
                    <img src={assets.questionicon} alt="" />
                    {extended ? <p>Help</p> : null}
                </div>
                <div className="bootom-item recent-entry">
                    <img src={assets.historyicon} alt="" />
                    {extended ? <p>Activity</p> : null}
                </div>
                <div className="bootom-item recent-entry">
                    <img src={assets.settingicon} alt="" />
                    {extended ? <p>Settings</p> : null}
                </div>

            </div>

        </div>
    )
}

export default Sidebar;


