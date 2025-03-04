// app/mahaabhaaratham/characters/[name]/page.tsx
'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Users, Heart, Baby, UserCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { Card } from '@/components/ui/card'
import { useCharacterDetails } from '@/app/hooks/useCharacterQueries'
import BackButton from '@/components/layout/BackButton'

export default function CharacterDetails() {
  const params = useParams()
  const [isImageOpen, setIsImageOpen] = useState(false)
  
  const characterName = (params.name as string).replace(/-/g, ' ')

  // TanStack Query hook for character details
  const { 
    data: character,
    isLoading,
    error: queryError
  } = useCharacterDetails(characterName)

  const error = queryError ? 'Failed to load character details' : null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-custom-navy via-custom-navy/95 to-custom-navy text-custom-mint p-8">
        <div className="max-w-4xl mx-auto">
          <BackButton
            href='/mahaabhaaratham/characters'
            label='Back to Characters'
          />
          <div className="grid gap-8">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-48 bg-custom-skyBlue/10 rounded-none backdrop-blur-sm animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-custom-navy via-custom-navy/95 to-custom-navy text-custom-mint p-8">
        <div className="max-w-7xl mx-auto">
          <BackButton
            href='/mahaabhaaratham/characters'
            label='Back to Characters'
          />
          <Alert className="bg-red-500/20 backdrop-blur-md border-red-500/50">
            <AlertDescription>{error || 'Character not found'}</AlertDescription>
          </Alert>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-custom-navy via-custom-navy/95 to-custom-navy text-custom-mint p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-custom-skyBlue/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-custom-skyBlue/5 via-transparent to-transparent"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Navigation */}
        <BackButton
          href='/mahaabhaaratham/characters'
          label='Back to Characters'
        />

        {/* Hero Section */}
        <div className="relative mb-12">
          <Card className="bg-custom-skyBlue/5 backdrop-blur-md border-custom-skyBlue/20 p-8 rounded-none overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-custom-skyBlue/5 to-transparent pointer-events-none"></div>
            <div className="flex flex-col md:flex-row items-center gap-8 relative">
              {/* Profile Image */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-custom-skyBlue/50 to-custom-mint/50 rounded-full blur opacity-75"></div>
                <div 
                  className="relative w-48 h-48 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  onClick={() => character.image && setIsImageOpen(true)}
                >
                  {character.image ? (
                    <Image 
                      src={character.image}
                      alt={character.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-custom-navy/50 backdrop-blur-sm flex items-center justify-center">
                      <UserCircle className="w-24 h-24 text-custom-skyBlue" />
                    </div>
                  )}
                </div>
              </div>

              {/* Character Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-5xl font-bold text-custom-mint mb-4 flex items-center gap-4">
                  {character.name}
                  <Sparkles className="w-6 h-6 text-custom-skyBlue/75" />
                </h1>
                {character.gender && (
                  <div className="inline-flex items-center gap-2 px-6 py-2 bg-custom-skyBlue/10 backdrop-blur-sm rounded-none border border-custom-skyBlue/20">
                    <span className="text-custom-skyBlue rounded-none font-light text-xl">{character.gender}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-8">
          {/* Description */}
          <Card className="bg-custom-skyBlue/5 backdrop-blur-md border-custom-skyBlue/20 p-8 rounded-none relative overflow-hidden group hover:bg-custom-skyBlue/10 transition-colors duration-300">
            <div className="absolute inset-0 bg-gradient-to-b from-custom-skyBlue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
            <h2 className="text-2xl text-custom-mint font-semibold mb-6 flex items-center gap-3">
              Story
              <div className="h-px flex-1 bg-gradient-to-r from-custom-skyBlue/50 to-transparent"></div>
            </h2>
            <div className="text-custom-skyBlue font-light text-lg text-justify leading-relaxed">
              {character.description}
            </div>
          </Card>

          {/* Family Details */}
          <Card className="bg-custom-skyBlue/5 backdrop-blur-md border-custom-skyBlue/20 p-8 rounded-none relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-custom-skyBlue/5 to-transparent pointer-events-none"></div>
            <h2 className="text-2xl text-custom-mint font-semibold mb-8 flex items-center gap-3">
              Family Details
              <div className="h-px flex-1 bg-gradient-to-r from-custom-skyBlue/50 to-transparent"></div>
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Parents */}
              <div className="group">
                <div className="flex items-center gap-3 mb-3">
                  <Users className="w-5 h-5 text-custom-skyBlue" />
                  <h3 className="text-xl text-custom-mint font-medium">Parents</h3>
                </div>
                <div className="text-custom-skyBlue font-light pl-8 relative">
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-custom-skyBlue/50 to-transparent"></div>
                  {character.parents}
                </div>
              </div>

              {/* Spouse */}
              {(character.wives || character.husband) && (
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <Heart className="w-5 h-5 text-custom-skyBlue" />
                    <h3 className="text-xl text-custom-mint font-medium">{character.wives ? 'Wives' : 'Husband'}</h3>
                  </div>
                  <div className="text-custom-skyBlue font-light pl-8 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-custom-skyBlue/50 to-transparent"></div>
                    {character.wives || character.husband}
                  </div>
                </div>
              )}

              {/* Children */}
              {character.children && (
                <div className="group">
                  <div className="flex items-center gap-3 mb-3">
                    <Baby className="w-5 h-5 text-custom-skyBlue" />
                    <h3 className="text-xl text-custom-mint font-medium">Children</h3>
                  </div>
                  <div className="text-custom-skyBlue font-light pl-8 relative">
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-custom-skyBlue/50 to-transparent"></div>
                    {character.children}
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Image Dialog */}
      <Dialog open={isImageOpen} onOpenChange={setIsImageOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none">
          <VisuallyHidden>
            <DialogTitle>Image of {character.name}</DialogTitle>
            <DialogDescription>Full size image view of {character.name} from the Mahabharata</DialogDescription>
          </VisuallyHidden>

          <div className="relative w-full h-[80vh]">
            <Image 
              src={character.image || ''}
              alt={character.name}
              fill
              sizes="100vw"
              className="object-contain"
              priority
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}