import '../CSS/AboutUs.css'
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';



function AboutUs () {

    return (
        <div id='aboutus-body'>
            
            <nav className='aboutus-nav'>
                <div className='logo-div'><a href="mailto:mtobabendev@gmail.com?subject=Project Requests">
                    <img id='company-logo' alt='company logo' title='WildCard' style={{border: '3px solid green', borderRadius: '10px'}}src='WildCardJoker.jpg'></img>
                    </a>
                </div>
                <div className='navigation-div'>Navigation</div>
            </nav>
            
            <section className='aboutus-section'>

            <img id='section-pic' alt='company logo' title="We're all mad here!" src='arkhamAsylum.webp'></img>

                {/* <ul id='section-slideshow'>
                    <li>
                        <h2 className='section-pic'>Title</h2>
                        <img id='section-pic' alt='company logo' title='Great Therapist, NOT a Model Patient.' src='quinnGaga2.webp'></img>
                    </li>
                    <li>
                        <h2 className='section-pic'>Title</h2>
                        <img id='section-pic' alt='company logo' title='Great Therapist, NOT a Model Patient.' src='quinnGaga.webp'></img>
                    </li>
                    <li>
                        <h2 className='section-pic'>Title</h2>
                        <img id='section-pic' alt='company logo' title='Great Therapist, NOT a Model Patient.' src='quinnRobbie.webp'></img>
                    </li>
                    <li>
                        <h2 className='section-pic'>Title</h2>
                        <img id='section-pic' alt='company logo' title='Great Therapist, NOT a Model Patient.' src='quinnRobbie2.webp'></img>
                    </li>
                    <li>
                        <h2 className='section-pic'>Title</h2>
                        <img id='section-pic' alt='company logo' title='Great Therapist, NOT a Model Patient.' src='jokerLedger.webp'></img>
                    </li>
                </ul> */}

            </section>
            
            <main className='aboutus-main'>
                <div className='joker-div'>
                    <img className="joker-pic" alt='Joker' title='Clown Prince of Crime' src='jokerLedger2.webp' />
                    <h2 className='aboutus-name'>Matt Tobaben a.k.a Joker</h2>
                    <br></br>
                    <h3 className='aboutus-title'><u>CEO. Yeah, I'm the one that really runs stuff here.</u></h3>
                    <br></br>
                    <p className='aboutus-text'> There's a VERY thin line between genius & insanity (if there's a line at all)
                                                & this guy lives it everyday. Company founder & always thinking up stuff that 
                                                works (like Tony Stark but better), this is the guy you want heading your projects. Click below to send him
                                                any inquires. 
                    </p>
                    <a href="mailto:mtobabendev@gmail.com?subject=Contact Us Questions">
                        <u>Contact <span style={{color: 'purple'}}>T</span><span style={{color: 'green'}}>h</span><span style={{color: 'purple'}}>e</span> <span style={{color: 'green'}}>J</span><span style={{color: 'purple'}}>o</span><span style={{color: 'green'}}>k</span><span style={{color: 'purple'}}>e</span><span style={{color: 'green'}}>r</span></u>
                    </a>
                </div>
                <div className='harley-div'>
                    <img className="harley-pic" alt='Harley Quinn' title='Clown Princess of Crime, and... you just let her escape.' src='quinnRobbie2.webp' />
                    <h2 className='aboutus-name-harley' title="This girl color's outside the lines."><p className='aboutus-name-harley1'> <span style={{color: 'red'}}>"This Could Be You"</span> a.k.a Harley Quinn</p></h2>
                    <br></br>
                    <h3 className='aboutus-title-harley'><p><u>Chief Operating Officer/Human Resources Director</u></p></h3>
                    <br></br>
                    <p className='aboutus-text'>We currently have an opening for this position. Great pay, full benefits & a fun 
                                                working environment! Must be crazy (sorry, we don't hire sane people here. Did you 
                                                forget where we are at?), highly intelligent, fun-loving, loyal & friendly. Click 
                                                the link below to apply.
                    </p>
                    <a href="mailto:mtobabendev@gmail.com?cc=entobaben@gmail.com&subject=COO/Harley Quinn Applicant">
                        <u>Click To Send Us Your Resume</u>
                    </a>
                </div>
                <div className='hugo-div'>
                    <img className="hugo-pic" alt='Space Beth' title="Rick's Daughter. So, yes. She is a genius." src='spaceBeth.png' />
                    <h2 className='aboutus-name'>Space Beth Smith</h2>
                    <br></br>
                    <h3 className='aboutus-title'><u>Chief Financial Officer/Developer</u></h3>
                    <br></br>
                    <p className='aboutus-text'>Keeping it real, this place would fall apart without this amazing member of our team. 
                                                She ensures that EVERYTHING runs smoothly & sorts out any problems that come up. Highly 
                                                intelligent & resourceful! A true pillar of the company. 
                    </p>
                    <a href="mailto:entobaben@gmail.com?subject=Project Requests">
                        <u>Ask me to bring your idea to life!</u>
                    </a>
                </div>
            </main>
            
            <div className='aboutus-footer'>
                <p>Dr. Crane once said:</p>
                <blockquote>"We have nothing to fear, but fear itself & I'm here to help!"</blockquote>

                <address>
                    {/* {()=> 'className'} forces the removal of the 'current' class auto-loaded by the web browser. */}
                    <NavLink to='/' onClick={() => {document.documentElement.scrollTop = 0}} className={()=> 'arkham-navlink'}><p id='basementHeader' title="Our Patients Aren't The Only Things Running Wild. Have Fun Catching This Link. HAHAHAHA!">www.<sup>A</sup>r<sub>K</sub>h<sup>A</sup>m<sub>A</sub>s<sup>Y</sup>l<sub>U</sub>m.com</p></NavLink>
                    <a href="tel:509-266-8566">1-800-55InSaNe</a><br></br>
                    1134 Totally Shady DR, Gotham City 16661-6969
                </address>
            </div>
        
        </div>
    )
}

export default AboutUs;