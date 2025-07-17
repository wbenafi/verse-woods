'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { LoginForm } from './LoginForm'
import { SignUpForm } from './SignUpForm'
import { VerseWoodsIcon } from '../icons/VerseWoodsIcon'
import localFont from 'next/font/local'


const myFont = localFont({
  src: "../../app/fonts/Fraunces-VariableFont_SOFT,WONK,opsz,wght.ttf",
  display: "swap",
});


export function AuthCard() {
  const [isLogin, setIsLogin] = useState(true)

  const toggleMode = () => {
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8 flex-1">
      <div className="max-w-md w-full space-y-8">
        <Card className="backdrop-blur-sm bg-background border-0 overflow-hidden rounded-3xl">
          <CardContent className="p-8 flex flex-col items-center justify-center gap-y-8">
            <div className="flex flex-row items-center justify-center gap-x-2">
              <VerseWoodsIcon className="w-24 h-24 text-primary" />
              <h2 className={`text-4xl font-bold text-primary ${myFont.className} text-center`}>
                Verse <br /> Woods
              </h2>
            </div>
            {isLogin ? (
              <LoginForm onToggleMode={toggleMode} />
            ) : (
              <SignUpForm onToggleMode={toggleMode} />
            )}
          </CardContent>
        </Card>
        
        <div className="text-center">
          <p className="text-xs text-primary-foreground">
            Secured by Supabase Authentication
          </p>
        </div>
      </div>
    </div>
  )
}