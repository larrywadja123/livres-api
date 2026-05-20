import { useEffect, useState } from "react";

function WishlistPage() {

  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {

    const data = localStorage.getItem("wishlist");

    if (data) {

      setWishlist(JSON.parse(data));

    }

  }, []);

  /* SUPPRIMER */
  const supprimerLivre = (indexLivre) => {

    const nouvelleWishlist = wishlist.filter(
      (_, index) => index !== indexLivre
    );

    setWishlist(nouvelleWishlist);

    localStorage.setItem(
      "wishlist",
      JSON.stringify(nouvelleWishlist)
    );

  };

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
        Liste de cadeaux
      </h1>

      {wishlist.length === 0 ? (

        <div
          style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "20px"
          }}
        >

          <h2>Aucun livre enregistré</h2>

        </div>

      ) : (

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap"
          }}
        >

          {wishlist.map((livre, index) => (

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
                    fontWeight: "bold"
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

      )}

    </div>

  );

}

export default WishlistPage;