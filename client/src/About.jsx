export default function About() {
return (
<div> 
<h1>About Me</h1>
{/*Picture of Ajani: */}
<img src="/AjaniDouglas.jpeg" alt="a photo of Ajani Douglas" width={108} height={116} style={{ float: 'left', marginRight: '20px' }}></img>
{/*Paragraph of me: */}
<p>My name is Ajani Tyler Douglas. I was born on October 8, 2007, currently 18 years old. 
    As of the time of me creating this website, I am currently working on my college diploma at Centennial College, doing the Software Engineering Technician program
    I've been in Canada for around a year and a half with Permanent Resident status, before this, I grew up in St. Catherine, Jamaica.</p>
{/*Link leading to my Resume: */}
<a href="/Resume-AjaniDouglas.pdf" download="Resume-AjaniDouglas.pdf">
    My Resume
</a> 
</div>
);
}