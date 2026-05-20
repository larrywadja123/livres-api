function OrdersPage() {

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f3eb",
        padding: "40px",
        fontFamily: "Arial"
      }}
    >

      <h1
        style={{
          color: "#06210f",
          marginBottom: "30px"
        }}
      >
        Mes commandes
      </h1>

      <div
        style={{
          backgroundColor: "white",
          padding: "30px",
          borderRadius: "20px",
          boxShadow: "0px 4px 15px rgba(0,0,0,0.08)"
        }}
      >

        <h2>Aucune commande disponible</h2>

        <p>
          Vos commandes apparaîtront ici.
        </p>

      </div>

    </div>

  );

}

export default OrdersPage;