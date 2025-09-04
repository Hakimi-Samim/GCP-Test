import React, { useContext } from 'react'

import './Main.css'
import { assets } from '../../assets/assets'
import { Context } from '../../context/Context'

const Main = () => {

    const { onSent, recentPrompt, showResult, loading, resultData, setInput, input } = useContext(Context)

    return (

        <div className='main'>
            <div className='nav'>
                <p>Residency Atlas</p>
                <img src={assets.usericon} alt="User Icon" />

            </div>
            <div className="main-container">

                {!showResult
                    ? <>

                        <div className="greet">
                            <p><span>Welcome to Residency Atlas!</span></p>
                            <p>How can I help you today?</p>
                        </div>
                        <div className="cards">
                            <div className="card">
                                <p>Which countries are the most attractive and viable relocation destinations for residency and 'Plan B' home?</p>
                                <img src={assets.compassicon} alt="" />
                            </div>
                            <div className="card">
                                <p>What are the residency and by investment requirements for investors, retirees, or remote workers? </p>
                                <img src={assets.bulbicon} alt="" />
                            </div>
                            <div className="card">
                                <p>Which countries offer favorable tax regimes (e.g., territorial taxation, no wealth/inheritance tax)?</p>
                                <img src={assets.messageicon} alt="" />
                            </div>
                            <div className="card">
                                <p>How do countries rank in healthcare access, cost, and quality?</p>
                                <img src={assets.codeicon} alt="" />
                            </div>
                        </div>

                    </>
                    : <div className='result'>
                        <div className="result-title">
                            <img src={assets.usericon} alt="" />
                            <p>{recentPrompt}</p>
                        </div>
                        <div className="result-data">
                            <img src={assets.geminiicon} alt="" />
                            {loading
                                ? <div className="dot-loader">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                                : <p dangerouslySetInnerHTML={{ __html: resultData }}></p>
                            }

                        </div>

                    </div>
                }
                <div className="main-bottom">
                    <div className="search-box">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            type="text"
                            placeholder="Enter your question here..."
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && input.trim()) {
                                    onSent();
                                }
                            }}
                        />

                        <div>
                            <img src={assets.galleryicon} alt="" />
                            <img src={assets.micicon} alt="" />
                            {input ? <img onClick={() => onSent()} src={assets.sendicon} alt="" /> : null}
                        </div>
                    </div>
                    <p className="bottom-info">
                        Residency Atlas offers comprehensive, personalized plans to support your successful immigration journey and help you achieve the best possible quality of life abroad.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Main;

