import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const navigate = useNavigate();

  /* STATES */
  const [livres, setLivres] = useState([]);
  const [livresFiltres, setLivresFiltres] = useState([]);
  const [recherche, setRecherche] = useState("");
  const [message, setMessage] = useState("");
  const [panier, setPanier] = useState([]);

  /* API */
  useEffect(() => {

    axios
      .get("http://localhost:5000/api/ouvrages")

      .then((response) => {

        setLivres(response.data);
        setLivresFiltres(response.data);

      })

      .catch(() => {

        setMessage("❌ Problème de connexion au serveur.");

      });

  }, []);

  /* CHARGER PANIER */
  useEffect(() => {

    const data = localStorage.getItem("panier");

    if (data) {

      setPanier(JSON.parse(data));

    }

  }, []);

  /* DISPARITION MESSAGE */
  useEffect(() => {

    if (message !== "") {

      const timer = setTimeout(() => {

        setMessage("");

      }, 5000);

      return () => clearTimeout(timer);

    }

  }, [message]);

  /* RECHERCHE */
  const rechercherLivres = () => {

    const resultat = livres.filter((livre) =>

      livre.titre.toLowerCase().includes(
        recherche.toLowerCase()
      )

    );

    setLivresFiltres(resultat);

    if (resultat.length === 0) {

      setMessage("❌ Aucun livre trouvé.");

    } else {

      setMessage(`✅ ${resultat.length} livre(s) trouvé(s)`);

    }

  };

  /* RETOUR ACCUEIL */
  const retourAccueil = () => {

    setLivresFiltres(livres);
    setRecherche("");
    setMessage("🏠 Retour à l'accueil");

  };

  return (

    <div
      style={{
        backgroundColor: "#f7f3eb",
        minHeight: "100vh",
        fontFamily: "Arial",
        padding: "25px"
      }}
    >

      {/* MESSAGE */}
      {message && (

        <div
          style={{
            backgroundColor: "#fff3cd",
            color: "#856404",
            padding: "15px",
            borderRadius: "10px",
            marginBottom: "25px",
            fontWeight: "bold"
          }}
        >
          {message}
        </div>

      )}

      {/* HEADER */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "40px",
          flexWrap: "wrap",
          gap: "15px"
        }}
      >

        {/* NAVBAR */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap"
          }}
        >

          <button
            onClick={retourAccueil}
            style={{
              backgroundColor: "#06210f",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Accueil
          </button>

          <button
            onClick={() => navigate("/wishlist")}
            style={{
              backgroundColor: "#06210f",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Liste cadeaux
          </button>

          <button
            onClick={() => navigate("/orders")}
            style={{
              backgroundColor: "#06210f",
              color: "white",
              border: "none",
              padding: "12px 18px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold"
            }}
          >
            Mes commandes
          </button>

        </div>

        {/* PANIER */}
        <button
          onClick={() => navigate("/cart")}
          style={{
            backgroundColor: "#f39b2f",
            color: "white",
            border: "none",
            padding: "14px 22px",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
          MON PANIER ({panier.length})
        </button>

      </div>

      {/* TITRE */}
      <h1
        style={{
          textAlign: "center",
          marginBottom: "50px",
          color: "#06210f",
          fontSize: "55px"
        }}
      >
        LivresGourmands.net
      </h1>

      {/* CONTENU */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "420px 1fr",
          gap: "30px",
          alignItems: "start"
        }}
      >

        {/* GAUCHE */}
        <div>

          {/* RECHERCHE */}
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "18px",
              marginBottom: "25px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#06210f",
                marginBottom: "25px"
              }}
            >
              Recherche simple
            </h2>

            <input
              type="text"
              placeholder="Rechercher un livre..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box"
              }}
            />

            <button
              onClick={rechercherLivres}
              style={{
                backgroundColor: "#06210f",
                color: "white",
                border: "none",
                padding: "14px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold"
              }}
            >
              Chercher
            </button>

          </div>

          {/* CONNEXION */}
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "18px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#06210f",
                marginBottom: "25px"
              }}
            >
              Connexion
            </h2>

            <input
              type="text"
              placeholder="Login"
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box"
              }}
            />

            <input
              type="password"
              placeholder="Mot de passe"
              style={{
                width: "100%",
                padding: "15px",
                marginBottom: "10px",
                borderRadius: "10px",
                border: "1px solid #ccc",
                boxSizing: "border-box"
              }}
            />

            <div
              style={{
                textAlign: "right",
                marginBottom: "20px"
              }}
            >

              <button
                onClick={() =>
                  setMessage("📧 Un lien de récupération a été envoyé.")
                }
                style={{
                  background: "none",
                  border: "none",
                  color: "#f39b2f",
                  cursor: "pointer",
                  fontWeight: "bold"
                }}
              >
                Mot de passe oublié ?
              </button>

            </div>

            <button
              style={{
                backgroundColor: "#f39b2f",
                color: "white",
                border: "none",
                padding: "14px 22px",
                borderRadius: "10px",
                cursor: "pointer",
                width: "100%",
                fontWeight: "bold"
              }}
            >
              Connexion
            </button>

          </div>

        </div>

        {/* DROITE */}
        <div>

          {/* LIVRES */}
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "18px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.08)",
              marginBottom: "25px"
            }}
          >

            <h2
              style={{
                color: "#06210f",
                marginBottom: "25px"
              }}
            >
              Meilleures ventes
            </h2>

            <div
              style={{
                display: "flex",
                gap: "20px",
                flexWrap: "wrap"
              }}
            >

              {livresFiltres.map((livre, index) => (

                <div
                  key={index}
                  style={{
                    width: "190px",
                    backgroundColor: "#f8f8f8",
                    borderRadius: "15px",
                    overflow: "hidden",
                    boxShadow: "0px 4px 10px rgba(0,0,0,0.08)"
                  }}
                >

                  <img
                    src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
                    alt={livre.titre}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover"
                    }}
                  />

                  <div
                    style={{
                      padding: "15px"
                    }}
                  >

                    <h4>{livre.titre}</h4>

                    <p
                      style={{
                        color: "#f39b2f",
                        fontWeight: "bold",
                        fontSize: "20px"
                      }}
                    >
                      {livre.prix} $
                    </p>

                    {/* PANIER */}
                    <button
                      onClick={() => {

                        const panierActuel = JSON.parse(
                          localStorage.getItem("panier")
                        ) || [];

                        const nouveauPanier = [
                          ...panierActuel,
                          livre
                        ];

                        localStorage.setItem(
                          "panier",
                          JSON.stringify(nouveauPanier)
                        );

                        setPanier(nouveauPanier);

                        setMessage(
                          `🛒 ${livre.titre} ajouté au panier`
                        );

                        navigate("/cart");

                      }}
                      style={{
                        backgroundColor: "#06210f",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        width: "100%"
                      }}
                    >
                      Ajouter au panier
                    </button>

                    {/* WISHLIST */}
                    <button
                      onClick={() => {

                        const wishlistActuelle = JSON.parse(
                          localStorage.getItem("wishlist")
                        ) || [];

                        const nouvelleWishlist = [
                          ...wishlistActuelle,
                          livre
                        ];

                        localStorage.setItem(
                          "wishlist",
                          JSON.stringify(nouvelleWishlist)
                        );

                        setMessage(
                          `🎁 ${livre.titre} ajouté à la wishlist`
                        );

                        navigate("/wishlist");

                      }}
                      style={{
                        backgroundColor: "#f39b2f",
                        color: "white",
                        border: "none",
                        padding: "10px 15px",
                        borderRadius: "10px",
                        cursor: "pointer",
                        width: "100%",
                        marginTop: "10px",
                        fontWeight: "bold"
                      }}
                    >
                      Ajouter à la wishlist
                    </button>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* AVIS */}
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "18px",
              boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#06210f",
                marginBottom: "25px"
              }}
            >
              Avis des clients
            </h2>

            {[
              {
                nom: "Marie",
                commentaire:
                  "Excellent livre de recettes africaines.",
                note: "★★★★★"
              },

              {
                nom: "Kevin",
                commentaire:
                  "Très bon achat et recettes incroyables.",
                note: "★★★★☆"
              }

            ].map((avis, index) => (

              <div
                key={index}
                style={{
                  backgroundColor: "#f8f8f8",
                  padding: "20px",
                  borderRadius: "15px",
                  marginBottom: "15px"
                }}
              >

                <h4>{avis.nom}</h4>

                <p>{avis.commentaire}</p>

                <span
                  style={{
                    color: "#f39b2f",
                    fontWeight: "bold"
                  }}
                >
                  {avis.note}
                </span>

              </div>

            ))}

          </div>

        </div>

      </div>

      {/* FOOTER */}
      <footer
        style={{
          backgroundColor: "#06210f",
          color: "white",
          padding: "30px",
          marginTop: "50px",
          borderRadius: "18px",
          textAlign: "center"
        }}
      >
        © 2026 LivresGourmands.net - Tous droits réservés.
      </footer>

    </div>

  );

}

export default HomePage;