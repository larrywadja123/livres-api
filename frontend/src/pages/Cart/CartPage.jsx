import { useEffect, useState } from "react";

function CartPage() {

  const [panier, setPanier] = useState([]);

  /* CHARGER PANIER */
  useEffect(() => {

    const data = localStorage.getItem("panier");

    if (data) {

      setPanier(JSON.parse(data));

    }

  }, []);

  /* SUPPRIMER */
  const supprimerLivre = (indexLivre) => {

    const nouveauPanier = panier.filter(
      (_, index) => index !== indexLivre
    );

    setPanier(nouveauPanier);

    localStorage.setItem(
      "panier",
      JSON.stringify(nouveauPanier)
    );

  };

  /* VIDER PANIER */
  const viderPanier = () => {

    setPanier([]);

    localStorage.removeItem("panier");

  };

  /* TOTAL */
  const total = panier.reduce(
    (acc, livre) => acc + Number(livre.prix),
    0
  );

  return (

    <div
      style={{
        backgroundColor: "#f7f3eb",
        minHeight: "100vh",
        padding: "30px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          color: "#06210f",
          marginBottom: "30px"
        }}
      >
        Mon Panier
      </h1>

      {panier.length === 0 ? (

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "20px"
          }}
        >

          <h2>Votre panier est vide</h2>

        </div>

      ) : (

        <>

          {/* LIVRES */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap"
            }}
          >

            {panier.map((livre, index) => (

              <div
                key={index}
                style={{
                  width: "220px",
                  backgroundColor: "white",
                  borderRadius: "20px",
                  overflow: "hidden",
                  boxShadow:
                    "0px 4px 15px rgba(0,0,0,0.08)"
                }}
              >

                <img
                  src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1200&auto=format&fit=crop"
                  alt={livre.titre}
                  style={{
                    width: "100%",
                    height: "160px",
                    objectFit: "cover"
                  }}
                />

                <div
                  style={{
                    padding: "20px"
                  }}
                >

                  <h3>{livre.titre}</h3>

                  <p
                    style={{
                      color: "#f39b2f",
                      fontWeight: "bold",
                      fontSize: "20px"
                    }}
                  >
                    {livre.prix} $
                  </p>

                  <button
                    onClick={() =>
                      supprimerLivre(index)
                    }
                    style={{
                      backgroundColor: "#c62828",
                      color: "white",
                      border: "none",
                      padding: "12px 15px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      width: "100%"
                    }}
                  >
                    Supprimer
                  </button>

                </div>

              </div>

            ))}

          </div>

          {/* TOTAL ET PAIEMENT */}
          <div
            style={{
              marginTop: "40px",
              backgroundColor: "white",
              padding: "25px",
              borderRadius: "20px",
              boxShadow:
                "0px 4px 15px rgba(0,0,0,0.08)"
            }}
          >

            <h2
              style={{
                color: "#06210f",
                marginBottom: "20px"
              }}
            >
              Total : {total.toFixed(2)} $
            </h2>

            {/* OPTIONS PAIEMENT */}
            <h3
              style={{
                marginBottom: "20px",
                color: "#06210f"
              }}
            >
              Options de paiement
            </h3>

            <div
              style={{
                display: "flex",
                gap: "15px",
                flexWrap: "wrap",
                marginBottom: "25px"
              }}
            >

              {/* VISA */}
              <button
                onClick={() =>
                  alert(
                    "Paiement Visa effectué avec succès ✅"
                  )
                }
                style={{
                  backgroundColor: "#1a1f71",
                  color: "white",
                  border: "none",
                  padding: "15px 25px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >
                💳 Visa
              </button>

              {/* MASTERCARD */}
              <button
                onClick={() =>
                  alert(
                    "Paiement Mastercard effectué avec succès ✅"
                  )
                }
                style={{
                  backgroundColor: "#eb001b",
                  color: "white",
                  border: "none",
                  padding: "15px 25px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >
                💳 Mastercard
              </button>

              {/* PAYPAL */}
              <button
                onClick={() =>
                  alert(
                    "Paiement PayPal effectué avec succès ✅"
                  )
                }
                style={{
                  backgroundColor: "#0070ba",
                  color: "white",
                  border: "none",
                  padding: "15px 25px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  fontSize: "16px"
                }}
              >
                PayPal
              </button>

            </div>

            {/* VIDER PANIER */}
            <button
              onClick={viderPanier}
              style={{
                backgroundColor: "#06210f",
                color: "white",
                border: "none",
                padding: "15px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold"
              }}
            >
              Vider le panier
            </button>

          </div>

        </>

      )}

    </div>

  );

}

export default CartPage;