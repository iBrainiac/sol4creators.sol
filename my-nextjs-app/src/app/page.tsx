 'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, Upload, DollarSign, Wallet } from "lucide-react"
import ConnectWalletBtn from '../components/connectwallet'
import { WalletDialog } from '@/components/Dialog'

// Placeholder function for IPFS upload
const uploadToIPFS = async (file: File) => {
  console.log('Uploading to IPFS:', file.name)
  return `ipfs://placeholder-hash-for-${file.name}`
}

// Placeholder function for Solflare wallet connection
const connectWallet = async () => {
  console.log('Connecting to Solflare wallet')
  // Implement actual Solflare wallet connection here
}

export default function Component() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [tipAmount, setTipAmount] = useState('')
  const [isWalletConnected, setIsWalletConnected] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleUpload = async () => {
    if (file) {
      setIsUploading(true)
      try {
        const ipfsHash = await uploadToIPFS(file)
        console.log('Uploaded to IPFS:', ipfsHash)
        // Here you would typically save the IPFS hash to your backend or blockchain
      } catch (error) {
        console.error('Upload failed:', error)
      }
      setIsUploading(false)
    }
  }

  const handleTip = () => {
    if (isWalletConnected) {
      console.log('Tipping creator:', tipAmount, 'SOL')
      // Implement actual tipping logic here
    } else {
      console.log('Please connect your wallet first')
    }
  }

  const handleWalletConnect = async () => {
    try {
      await connectWallet()
      setIsWalletConnected(true)
    } catch (error) {
      console.error('Wallet connection failed:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#9945FF] to-[#14F195] flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Sol4Creators</h1>
      <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm">
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle className="text-2xl font-bold text-[#9945FF]">Create & Support</CardTitle>
            <div
            >
              {/* <ConnectWalletBtn/> */}
              <WalletDialog/>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="creator" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="creator">Creator Upload</TabsTrigger>
              <TabsTrigger value="community">Community Support</TabsTrigger>
            </TabsList>
            <TabsContent value="creator">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="file-upload" className="text-sm font-medium text-[#9945FF]">
                    Upload Content
                  </Label>
                  <Input
                    id="file-upload"
                    type="file"
                    onChange={handleFileChange}
                    className="border-[#14F195] focus:ring-[#9945FF]"
                  />
                </div>
                {preview && (
                  <div className="aspect-video w-full relative">
                    {file?.type.startsWith('image/') ? (
                      <img src={preview} alt="Preview" className="w-full h-full object-cover rounded-md" />
                    ) : file?.type.startsWith('video/') ? (
                      <video src={preview} className="w-full h-full object-cover rounded-md" controls />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-md">
                        <p className="text-gray-500">File Preview Not Available</p>
                      </div>
                    )}
                  </div>
                )}
                <Button
                  onClick={handleUpload}
                  disabled={!file || isUploading}
                  className="w-full bg-[#14F195] hover:bg-[#0DD180] text-white"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload to IPFS
                    </>
                  )}
                </Button>
              </div>
            </TabsContent>
            <TabsContent value="community">
              <div className="space-y-4">
                <div className="aspect-video w-full bg-gray-200 rounded-md flex items-center justify-center">
                  <p className="text-gray-500">Creator Content Will Appear Here</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Input
                    type="number"
                    placeholder="Amount in SOL"
                    value={tipAmount}
                    onChange={(e) => setTipAmount(e.target.value)}
                    className="flex-grow border-[#14F195] focus:ring-[#9945FF]"
                  />
                  <Button 
                    onClick={handleTip}
                    disabled={!isWalletConnected}
                    className="bg-[#9945FF] hover:bg-[#7B35D9] text-white"
                  >
                    <DollarSign className="mr-2 h-4 w-4" />
                    Tip Creator
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="text-sm text-gray-500">
          Support creators directly with Sol4Creators!
        </CardFooter>
      </Card>
    </div>
  )
}