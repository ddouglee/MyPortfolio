import { Link } from 'react-router-dom';
export default function Home() {
return (
    <div>     {/*Home Page: */}
        <h1>Welcome!</h1>
        <p>Hello! My name is Ajani Douglas, and this is the home page of my portfolio.</p> 
        <p><Link to="/about">More about me here</Link></p>
        <h3>My Mission</h3>
        <p>I want the world to be a better place to live in, and my personal mission to contribute to that is to spread joy throughout the world.</p>
        <p>Whether it be through my actions or programming, 
            I want to put a smile on as many people's faces as possible, 
            we all deserve to have something to look forward 
            to, something to be happy about, and I hope that one day 
            I can build something or do something that spreads joy to many.</p>
    </div>
    );
}