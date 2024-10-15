import * as React from "react"
import { Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import Link from "next/link"

export default function Component() {
  const cases = [
    { id: 1, date: "2023-01-15", name: "Ramos vs. Acme Inc", assignedTo: "John Doe", status: "In Progress", progress: 70, nextStep: "Demand Letter", allowLink: false },
    { id: 2, date: "2023-01-20", name: "Ramirez vs. Clean Max Inc.", assignedTo: "Jane Smith", status: "New", progress: 10, nextStep: "Intake Analysis", allowLink: true },
    { id: 3, date: "2023-02-10", name: "Johnson vs. Tech Solutions", assignedTo: "Michael Johnson", status: "Closed | Won", progress: 100, nextStep: "View", allowLink: false },
    { id: 4, date: "2023-02-15", name: "Brown vs. Retail LLC", assignedTo: "Emily Brown", status: "In Progress", progress: 40, nextStep: "Issue Spotting", allowLink: false },
    { id: 5, date: "2023-03-01", name: "Wilson vs. FinGroup", assignedTo: "David Wilson", status: "New", progress: 5, nextStep: "Intake Analysis", allowLink: false },
    { id: 6, date: "2023-03-05", name: "White vs. Health Inc", assignedTo: "Sarah White", status: "Closed | Won", progress: 100, nextStep: "View", allowLink: false },
    { id: 7, date: "2023-03-10", name: "Lee vs. Transport Co", assignedTo: "Kevin Lee", status: "In Progress", progress: 60, nextStep: "Issue Spotting", allowLink: false },
    { id: 8, date: "2023-03-15", name: "Martin vs. Energy Corp", assignedTo: "Laura Martin", status: "New", progress: 15, nextStep: "Intake Analysis", allowLink: false },
    { id: 9, date: "2023-04-01", name: "Garcia vs. Media Inc", assignedTo: "Eva Garcia", status: "Closed | Lost", progress: 100, nextStep: "View", allowLink: false },
    { id: 10, date: "2023-04-05", name: "Hernandez vs. Construction LLC", assignedTo: "Chris Hernandez", status: "In Progress", progress: 55, nextStep: "Issue Spotting", allowLink: false },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-background w-screen">
      <header className="border-b">
        <div className="flex h-16 items-center px-4">
          <h1 className="text-2xl font-bold">Matter Hub</h1>
          <div className="ml-auto flex items-center space-x-4">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
              <span className="sr-only">Notifications</span>
            </Button>
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Avatar>
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <main className="flex-1 p-8">
        <Tabs defaultValue="all" className="mb-6">
          <TabsList>
            <TabsTrigger value="all">All cases</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="in-progress">In progress</TabsTrigger>
            <TabsTrigger value="won">Won</TabsTrigger>
            <TabsTrigger value="lost">Lost</TabsTrigger>
          </TabsList>
        </Tabs>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Matter Name</TableHead>
              <TableHead>Assigned To</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Next Step</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cases.map((caseItem) => (
              <TableRow key={caseItem.id}>
                <TableCell>{caseItem.date}</TableCell>
                <TableCell>
                  <Link href={caseItem.allowLink ? `/case/${caseItem.id}` : "#"} className="text-primary hover:underline">
                    {caseItem.name}
                  </Link>
                </TableCell>
                <TableCell>{caseItem.assignedTo}</TableCell>
                <TableCell>{caseItem.status}</TableCell>
                <TableCell>
                  <Progress value={caseItem.progress} className="w-[100px]" />
                </TableCell>
                <TableCell>
                  <Button className="w-full" asChild variant="secondary">
                    <Link href={caseItem.allowLink ? `/case/${caseItem.id}` : "#"}>
                      {caseItem.nextStep}
                    </Link>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </main>
    </div>
  )
}