import { Link } from "react-router-dom";

function Dashboard() {

  return (

    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        fontFamily: "Arial"
      }}
    >

      {/* SIDEBAR */}
      <div
        style={{
          width: "250px",
          backgroundColor: "#06210f",
          color: "white",
          padding: "30px"
        }}
      >

        <h2>Dashboard Admin</h2>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            marginTop: "30px"
          }}
        >

          <Link
            to="/admin/add-book"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Ajouter Livre
          </Link>

          <Link
            to="/admin/orders"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Commandes
          </Link>

          <Link
            to="/admin/users"
            style={{
              color: "white",
              textDecoration: "none"
            }}
          >
            Utilisateurs
          </Link>

        </div>

      </div>

      {/* CONTENU */}
      <div
        style={{
          flex: 1,
          backgroundColor: "#f7f3eb",
          padding: "40px"
        }}
      >

        <h1>Bienvenue Administrateur</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            marginTop: "30px",
            flexWrap: "wrap"
          }}
        >

          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "20px",
              width: "250px"
            }}
          >

            <h3>Gestion Livres</h3>

            <p>Ajouter et modifier les ouvrages</p>

          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "20px",
              width: "250px"
            }}
          >

            <h3>Gestion Commandes</h3>

            <p>Suivi des achats clients</p>

          </div>

          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "20px",
              width: "250px"
            }}
          >

            <h3>Gestion Utilisateurs</h3>

            <p>Administration des comptes</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default Dashboard;