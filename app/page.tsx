"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"

export default function FormularioNovia() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [showModal, setShowModal] = useState(false)
  const [hasChosen, setHasChosen] = useState(false)
  const [shouldShowToast, setShouldShowToast] = useState(false)
  const noButtonRef = useRef<HTMLButtonElement>(null)
  const { toast } = useToast()

  useEffect(() => {
    const choice = localStorage.getItem("choice")
    if (choice === "yes") {
      setHasChosen(true)
      setShowModal(true)
      setShouldShowToast(true)
    }
  }, [])

  useEffect(() => {
    if (shouldShowToast) {
      toast({
        description: "Envíale pantallazo del resultado a esa persona que te envió el enlace",
      })
      setShouldShowToast(false)
    }
  }, [shouldShowToast, toast])

  useEffect(() => {
    if (!hasChosen) {
      const handleMouseMove = (e: MouseEvent) => {
        if (noButtonRef.current) {
          const rect = noButtonRef.current.getBoundingClientRect()
          const distance = Math.sqrt(
            Math.pow(e.clientX - (rect.left + rect.width / 2), 2) +
            Math.pow(e.clientY - (rect.top + rect.height / 2), 2),
          )

          if (distance < 100) {
            moveButton()
          }
        }
      }

      document.addEventListener("mousemove", handleMouseMove)
      return () => document.removeEventListener("mousemove", handleMouseMove)
    }
  }, [hasChosen])

  const moveButton = () => {
    const maxX = window.innerWidth - 100
    const maxY = window.innerHeight - 40
    const newX = Math.random() * maxX
    const newY = Math.random() * maxY
    setPosition({ x: newX, y: newY })
  }

  const handleSiClick = () => {
    toast({
      description: "Envíale pantallazo del resultado a esa persona que te envió el enlace",
    })
    setShowModal(true)
    setHasChosen(true)
    localStorage.setItem("choice", "yes")
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('butterfly.jpg?height=1080&width=1920')" }}
    >
      {!hasChosen && (
        <div className="bg-white bg-opacity-40 p-8 rounded-lg shadow-xl text-center">
          <h1 className="text-3xl font-bold text-white">¡¿Te gustaría ser mi San Valentín, tín, tín?! 💘</h1>
          <div className="space-y-4">
            <Button
              onClick={handleSiClick}
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              SÍ 😊
            </Button>
            <Button
              ref={noButtonRef}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded absolute"
              style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transition: "all 0.2s ease-in-out",
              }}
            >
              No 😢
            </Button>
            <a href="https://github.com/Yahikho" className="fixed bottom-0 left-0 text-white">by Yahiko</a>
          </div>
        </div>
      )}

      <Dialog open={showModal} onOpenChange={() => { }}>
        <DialogContent className="sm:max-w-[425px]" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle>¡Felicidades! 🎉💖</DialogTitle>
            <DialogDescription>¡¡¡¡ Ahora tu culo será mío !!!! 🤪🤪🤪🤪🤪🤪</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center">
            <img src="1.jpg?height=200&width=200" alt="Celebración" className="rounded-full" />
          </div>
        </DialogContent>
      </Dialog>

    </div>

  )
}

