'use client'
import { useState } from 'react'
import { useParams } from 'next/navigation'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Users, Heart, Baby, UserCircle, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { VisuallyHidden } from '@/components/ui/visually-hidden'
import { Card } from '@/components/ui/card'
import { useCharacterDetails, useCharacterImage } from '@/hooks/useCharacterQueries'
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

  // TanStack Query hook for character image
  const {
    data: characterImage,
    isLoading: imageLoading
  } = useCharacterImage(character?.name || '')

  const error = queryError ? 'Failed to load character details' : null

  if (isLoading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-custom-navy via-custom-navy/95 to-custom-navy text-custom-mint p-4 sm:p-6 md:p-8" aria-busy="true" aria-live="polite">
        <div className="max-w-4xl mx-auto">
          <BackButton
            href='/mahaabhaaratham/characters'
            label='Back to Characters'
          />
          <div className="grid gap-6 md:gap-8" aria-label="Loading character information">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 sm:h-32 md:h-48 bg-custom-sky-blue/10 rounded-none backdrop-blur-xs animate-pulse" aria-hidden="true"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error || !character) {
    return (
      <div className="min-h-screen bg-linear-to-br from-custom-navy via-custom-navy/95 to-custom-navy text-custom-mint p-4 sm:p-6 md:p-8" role="alert" aria-live="assertive">
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

  // Determine the image to display
  const displayImage = characterImage

  return (
    <div className="min-h-screen bg-linear-to-br from-custom-navy via-custom-navy/95 to-custom-navy text-custom-mint p-4 sm:p-6 md:p-8 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-custom-sky-blue/5 via-transparent to-transparent" aria-hidden="true"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-custom-sky-blue/5 via-transparent to-transparent" aria-hidden="true"></div>

      <div className="max-w-4xl mx-auto relative">
        {/* Navigation */}
        <BackButton
          href='/mahaabhaaratham/characters'
          label='Back to Characters'
        />

        {/* Hero Section */}
        <div className="relative mb-12" aria-labelledby="character-name">
          <Card className="bg-custom-sky-blue/5 backdrop-blur-md border-custom-sky-blue/20 sm:p-6 md:p-8 rounded-none overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-custom-sky-blue/5 to-transparent pointer-events-none" aria-hidden="true"></div>
            <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 relative">
              {/* Profile Image */}
              <div className="relative">
                <div className="absolute -inset-0.5 bg-linear-to-r from-custom-sky-blue/50 to-custom-mint/50 rounded-full blur-sm opacity-75" aria-hidden="true"></div>
                <div 
                  className="relative w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden cursor-pointer transition-transform hover:scale-105"
                  onClick={() => displayImage && setIsImageOpen(true)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      if (displayImage) {
                        setIsImageOpen(true);
                      }
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`View full image of ${character.name}`}
                  data-character-name={character.name}                  
                >
                  {imageLoading ? (
                    <div className="w-full h-full bg-custom-navy/50 backdrop-blur-xs flex items-center justify-center animate-pulse" aria-label="Loading character image">
                      <UserCircle className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 text-custom-sky-blue" aria-hidden="true"/>
                    </div>
                  ) : displayImage ? (
                    <Image 
                      src={displayImage}
                      alt={character.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                      priority
                    />
                  ) : (
                    <div className="w-full h-full bg-custom-navy/50 backdrop-blur-xs flex items-center justify-center" aria-label="No image available">
                      <UserCircle className="w-24 h-24 text-custom-sky-blue" aria-hidden="true"/>
                    </div>
                  )}
                </div>
              </div>

              {/* Character Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 id="character-name" className="text-3xl sm:text-4xl md:text-5xl font-bold text-custom-mint mb-3 md:mb-4 flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-4">
                  {character.name}
                  <Sparkles className="size-5 sm:size-6 text-custom-sky-blue/75" aria-hidden="true"/>
                </h1>
                {character.gender && (
                  <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-1 sm:py-2 bg-custom-sky-blue/10 backdrop-blur-xs rounded-none border border-custom-sky-blue/20" aria-label={`Gender: ${character.gender}`} data-character-gender={character.gender}>
                    <span className="text-custom-sky-blue rounded-none font-light text-lg sm:text-xl">{character.gender}</span>
                  </div>
                )}
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="space-y-6 md:space-y-8">
          {/* Description */}
          <Card className="bg-custom-sky-blue/5 backdrop-blur-md border-custom-sky-blue/20 p-4 sm:p-6 md:p-8 rounded-none relative overflow-hidden group hover:bg-custom-sky-blue/10 transition-colors duration-300">
            <div className="absolute inset-0 bg-linear-to-b from-custom-sky-blue/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" aria-hidden="true"></div>
            <h2 id="character-story" className="text-xl sm:text-2xl text-custom-mint font-semibold mb-4 sm:mb-6 flex items-center gap-3">
              Story
              <div className="h-px flex-1 bg-linear-to-r from-custom-sky-blue/50 to-transparent" aria-hidden="true"></div>
            </h2>
            <div className="text-custom-sky-blue font-light text-base sm:text-lg text-justify leading-relaxed"
              aria-labelledby="character-story"
              data-character-story={character.name}
            >
              {character.description}
            </div>
          </Card>

          {/* Family Details */}
          <Card className="bg-custom-sky-blue/5 backdrop-blur-md border-custom-sky-blue/20 p-4 sm:p-6 md:p-8 rounded-none relative overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-r from-custom-sky-blue/5 to-transparent pointer-events-none" aria-hidden="true"></div>
            <h2 id="family-details" className="text-xl sm:text-2xl text-custom-mint font-semibold mb-4 sm:mb-6 md:mb-8 flex items-center gap-3">
              Family Details
              <div className="h-px flex-1 bg-linear-to-r from-custom-sky-blue/50 to-transparent" aria-hidden="true"></div>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {/* Parents */}
              <div className="group">
                <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3" aria-hidden="true">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5 text-custom-sky-blue" />
                  <h3 id="parents-section" className="text-lg sm:text-xl text-custom-mint font-medium">Parents</h3>
                </div>
                <div 
                  className="text-custom-sky-blue font-light pl-6 sm:pl-8 relative"
                  aria-labelledby="parents-section"
                  data-relation-type="parents"
                >
                  <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-custom-sky-blue/50 to-transparent" aria-hidden="true"></div>
                  {character.parents}
                </div>
              </div>

              {/* Spouse */}
              {(character.wives || character.husband) && (
                <div className="group">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3" aria-hidden="true">
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-custom-sky-blue" />
                    <h3 id="spouse-section" className="text-lg sm:text-xl text-custom-mint font-medium">{character.wives ? 'Wives' : 'Husband'}</h3>
                  </div>
                  <div 
                    className="text-custom-sky-blue font-light pl-6 sm:pl-8 relative"
                    aria-labelledby="spouse-section"
                    data-relation-type={character.wives ? 'wives' : 'husband'}
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-custom-sky-blue/50 to-transparent" aria-hidden="true"></div>
                    {character.wives || character.husband}
                  </div>
                </div>
              )}

              {/* Children */}
              {character.children && (
                <div className="group">
                  <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3" aria-hidden="true">
                    <Baby className="w-4 h-4 sm:w-5 sm:h-5 text-custom-sky-blue" />
                    <h3 id="children-section" className="text-lg sm:text-xl text-custom-mint font-medium">Children</h3>
                  </div>
                  <div 
                    className="text-custom-sky-blue font-light pl-6 sm:pl-8 relative"
                    aria-labelledby="children-section"
                    data-relation-type="children"
                  >
                    <div className="absolute left-0 top-0 bottom-0 w-px bg-linear-to-b from-custom-sky-blue/50 to-transparent" aria-hidden="true"></div>
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
        <DialogContent className="max-w-3xl sm:max-w-4xl p-0 overflow-hidden bg-transparent border-none" aria-labelledby="dialog-title" aria-describedby="dialog-description">
          <VisuallyHidden>
            <DialogTitle>Image of {character.name}</DialogTitle>
            <DialogDescription>Full size image view of {character.name} from the Mahaa Bhaaratham</DialogDescription>
          </VisuallyHidden>

          <div className="relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[80vh]">
            <Image 
              src={displayImage || ''}
              alt={`Full portrait of ${character.name}`}
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