import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">

        <Link className="navbar-brand" to="/">
          Livres Gourmands
        </Link>

        <div>
          <ul className="navbar-nav ms-auto">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                Accueil
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/panier">
                Panier
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/connexion">
                Connexion
              </Link>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;