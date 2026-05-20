import { createContext, useEffect, useState } from "react";

export const PanierContext = createContext();

export const PanierProvider = ({ children }) => {

  const [panier, setPanier] = useState(() => {

    const panierSauvegarde = localStorage.getItem("panier");

    return panierSauvegarde
      ? JSON.parse(panierSauvegarde)
      : [];

  });

  // SAUVEGARDE LOCALSTORAGE
  useEffect(() => {

    localStorage.setItem(
      "panier",
      JSON.stringify(panier)
    );

  }, [panier]);

  // AJOUTER AU PANIER
  const ajouterAuPanier = (ouvrage) => {

    const existe = panier.find(
      (item) => item.id === ouvrage.id
    );

    if (existe) {

      const nouveauPanier = panier.map((item) =>

        item.id === ouvrage.id
          ? {
              ...item,
              quantite: item.quantite + 1
            }
          : item

      );

      setPanier(nouveauPanier);

    } else {

      setPanier([
        ...panier,
        {
          ...ouvrage,
          quantite: 1
        }
      ]);

    }

  };

  // SUPPRIMER
  const supprimerDuPanier = (id) => {

    const nouveauPanier = panier.filter(
      (item) => item.id !== id
    );

    setPanier(nouveauPanier);

  };

  // TOTAL
  const total = panier.reduce(

    (acc, item) =>

      acc + item.prix * item.quantite,

    0

  );

  return (

    <PanierContext.Provider
      value={{
        panier,
        ajouterAuPanier,
        supprimerDuPanier,
        total
      }}
    >

      {children}

    </PanierContext.Provider>

  );

};