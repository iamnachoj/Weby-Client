

export default function Footer(){
  return (
    <footer className="text-center text-lg-start p-5 mt-5">
        <div className="text-center text-white p-1">
        © {new Date().getFullYear()} Copyright: 
            <a className="text-light" target="_blank" rel="noreferrer" href="https://iamnachoj.github.io/portfolio-website/"> Ignacio Jimenez</a>
        </div>
    </footer>
  )
}