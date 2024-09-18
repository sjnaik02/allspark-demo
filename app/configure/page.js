"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, X, User, Sliders, MoreHorizontal } from "lucide-react"
import Link from "next/link"

export default function Settings() {
  const [selectedLaws, setSelectedLaws] = useState([])
  const [customInstructions, setCustomInstructions] = useState("")
  const [uploadedTemplates, setUploadedTemplates] = useState([])
  const [activeTab, setActiveTab] = useState("generation")

  const handleLawSelect = (law) => {
    if (!selectedLaws.includes(law)) {
      setSelectedLaws([...selectedLaws, law])
    }
  }

  const handleLawRemove = (law) => {
    setSelectedLaws(selectedLaws.filter((l) => l !== law))
  }

  const handleTemplateUpload = (event) => {
    const files = event.target.files
    if (files) {
      const newTemplates = Array.from(files).map((file) => file.name)
      setUploadedTemplates([...uploadedTemplates, ...newTemplates])
    }
  }

  const handleTemplateRemove = (template) => {
    setUploadedTemplates(uploadedTemplates.filter((t) => t !== template))
  }

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="w-full max-w-6xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
          <aside className="space-y-6">
            <div className="flex items-center space-x-2 mb-6">
              <Link href="/">
                <Button variant="ghost" size="icon">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
              </Link>
              <h1 className="text-3xl font-bold">Settings</h1>
            </div>
            <nav className="space-y-2">
              <Button
                variant={activeTab === "account" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("account")}
              >
                <User className="mr-2 h-4 w-4" />
                Account
              </Button>
              <Button
                variant={activeTab === "generation" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("generation")}
              >
                <Sliders className="mr-2 h-4 w-4" />
                Generation
              </Button>
              <Button
                variant={activeTab === "miscellaneous" ? "secondary" : "ghost"}
                className="w-full justify-start"
                onClick={() => setActiveTab("miscellaneous")}
              >
                <MoreHorizontal className="mr-2 h-4 w-4" />
                Miscellaneous
              </Button>
            </nav>
          </aside>

          <main className="space-y-8">
            {activeTab === "generation" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">AI Generation Preferences</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="laws">Select Relevant Laws</Label>
                    <Select onValueChange={handleLawSelect}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a law" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="contract">Contract Law</SelectItem>
                        <SelectItem value="corporate">Corporate Law</SelectItem>
                        <SelectItem value="criminal">Criminal Law</SelectItem>
                        <SelectItem value="family">Family Law</SelectItem>
                        <SelectItem value="intellectual">Intellectual Property Law</SelectItem>
                      </SelectContent>
                    </Select>
                    <ScrollArea className="h-20 w-full border rounded-md p-2">
                      <div className="flex flex-wrap gap-2">
                        {selectedLaws.map((law) => (
                          <Badge key={law} variant="secondary" className="flex items-center gap-1">
                            {law}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => handleLawRemove(law)} />
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="templates">Upload Document Templates</Label>
                    <Input id="templates" type="file" multiple onChange={handleTemplateUpload} />
                    <ScrollArea className="h-20 w-full border rounded-md p-2">
                      <div className="flex flex-wrap gap-2">
                        {uploadedTemplates.map((template) => (
                          <Badge key={template} variant="secondary" className="flex items-center gap-1">
                            {template}
                            <X className="h-3 w-3 cursor-pointer" onClick={() => handleTemplateRemove(template)} />
                          </Badge>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="instructions">Custom Instructions</Label>
                    <Textarea
                      id="instructions"
                      placeholder="Enter any custom instructions for the AI..."
                      value={customInstructions}
                      onChange={(e) => setCustomInstructions(e.target.value)}
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">AI Behavior Preferences</h3>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="citations">Include citations in responses</Label>
                      <Switch id="citations" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="explanations">Provide detailed explanations</Label>
                      <Switch id="explanations" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="summaries">Generate document summaries</Label>
                      <Switch id="summaries" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {activeTab === "account" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Account Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Change Password</Label>
                    <Input id="password" type="password" placeholder="New password" />
                  </div>
                  <Button>Update Account</Button>
                </CardContent>
              </Card>
            )}

            {activeTab === "miscellaneous" && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Miscellaneous Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="notifications">Enable Notifications</Label>
                    <Switch id="notifications" />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="darkMode">Dark Mode</Label>
                    <Switch id="darkMode" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Preferred Language</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}