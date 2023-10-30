import logo from '../images/legalease.png'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom"
function Nav() {
  let n = <header class="text-gray-600 body-font">
    <div class="container mx-auto flex flex-wrap p-7 flex-col md:flex-row items-center justify-center">
      <a class="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
        <img src={logo}/>
      </a>
      <nav class="md:mr-auto md:ml-4 md:py-1 md:pl-4  md:border-gray-400	flex flex-wrap items-center text-base justify-center">
        <a class="mr-5 hover:text-gray-900" href="/news/attorney">Attorney</a>&nbsp
        <a class="mr-5 hover:text-gray-900" href="/news/lawyer">Lawyer</a>&nbsp
        <a class="mr-5 hover:text-gray-900" href="/news/advocate">Advocate</a>&nbsp
        <a class="mr-5 hover:text-gray-900" href="/news/mediation">Mediation</a>&nbsp

      </nav>
    </div>
  </header>
  return n;
}
export default Nav;