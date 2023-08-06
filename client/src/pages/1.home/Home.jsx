import MainLayout from "../../layouts/MainLayout.jsx"

/**
 * Composant représentant la page d'accueil.
 *
 * Cette page affiche du contenu statique pour présenter l'application.
 * Elle utilise le composant MainLayout pour définir la mise en page globale.
 *
 * @returns {JSX.Element} Le composant de la page d'accueil.
 */
function Home() {
  return (
    <MainLayout>
      {/* Contenu de la page d'accueil */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12 flex flex-col items-center justify-between pb-[20vh] sm:pb-[56vh] ">
        <h1 className="text-center p-4">HOME</h1>
        <p className="mx-5">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
          animi consequatur culpa cumque dolore dolorum eos est explicabo
          facilis fuga harum hic inventore ipsa iste nobis non odit pariatur
          quae quisquam repellendus, sapiente sit, ut vero voluptas voluptates!
          Alias ducimus ipsa iure neque odio optio qui sapiente soluta? Aperiam
          aspernatur cum explicabo iste, iure sint tempore? Accusamus autem
          consectetur culpa doloremque dolores eaque est ex hic impedit labore
          laborum minus necessitatibus nihil, officia officiis perspiciatis
          tenetur? Asperiores, consequatur consequuntur deleniti distinctio ea
          enim esse fuga id illum ipsam iste laboriosam magni molestiae nam
          nostrum officia quis similique tempora unde voluptatibus?
        </p>
      </div>
    </MainLayout>
  )
}

export default Home
