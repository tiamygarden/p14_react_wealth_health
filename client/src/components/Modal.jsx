import { createPortal } from "react-dom"
import { forwardRef, useEffect, useImperativeHandle, useState } from "react"

const Modal = forwardRef(({ title, body, footer }, ref) => {
  // Utilisation de "useState" pour gérer l'affichage de la modale
  const [display, setDisplay] = useState(false)

  // Fonction pour fermer la modale
  function close() {
    setDisplay(false)
  }

  // Fonction pour ouvrir la modale
  function open() {
    setDisplay(true)
  }

  // Utilisation de "useImperativeHandle" pour exposer une API impérative à partir d'un composant fonctionnel
  useImperativeHandle(ref, () => ({ open, close }))

  // Utilisation de "useEffect" pour gérer le défilement du body
  useEffect(() => {
    if (display) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }

    // Nettoie l'effet lors de la fermeture de la modale
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [display])

  return createPortal(
    <div
      className={
        "fixed inset-0 justify-center items-center bg-black/50 backdrop-blur-sm	 " +
        (display ? "flex" : "hidden")
      }
      onClick={() => close()}
    >
      <div
        className="w-[450px] min-h-[150px] p-2 bg-white rounded-md shadow-2xl flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="mx-auto pb-2 text-2xl">{title}</h3>
        <div className="flex flex-wrap flex-grow items-center leading-5 mb-1">
          {body}
        </div>
        <div className="bg-stone-100 p-2 -m-2 mt-2">
          {footer}
          <button
            className="flex justify-center m-auto p-2 bg-green-500 rounded"
            onClick={() => close()}
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
})

export default Modal
