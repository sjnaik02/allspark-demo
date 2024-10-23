"use client"
import { Pencil, Zap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import TypewriterText from "@/components/TypewriterText"
const IntakeAnalysis = () => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>
          <Zap className="inline-block mr-2" />
          AllSpark Intake Quick View
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">
          <TypewriterText text="Daniel v. CleanMax Services, Inc." />
        </h3>
        <TypewriterText text="8392 Oakdale Avenue, Los Angeles, CA 91306" className="text-sm text-muted-foreground mb-4" />
        <TypewriterText text="Oct 13, 2023" />
        <TypewriterText text="Daniel Ramirez, a janitorial staff member at CleanMax Services, was employed from August 2021 to May 2024, earning $18.50 per hour. He frequently missed meal and rest breaks due to heavy workloads, worked overtime without proper compensation, and was required to work off the clock for 75 minutes per week without pay. Ramirez raised concerns about unsafe working conditions, specifically exposure to hazardous chemicals without protective equipment, which led to his abrupt termination in what he believes was retaliation. He also experienced harassment and discrimination based on his Hispanic ethnicity, and faced delays in receiving his final paycheck. Additionally, Ramirez had to purchase his own safety gear, was denied paid sick leave after suffering chemical burns, and was refused time off to care for a sick family member. He claims violations of California labor laws and the Fair Employment and Housing Act (FEHA)." />

        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>
          <Zap className="inline-block mr-2" />
          AllSpark Defendant Research
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-2">
          <TypewriterText text="Clean Max Services Company Summary" />
        </h3>
        <p className="text-sm mb-4">
          <TypewriterText text="CleanMax Services, Inc. is a California-based commercial cleaning company with 3000 employees that specializes in providing janitorial and maintenance services to office buildings, industrial facilities, and retail spaces. Recent news shows that Clean Max has regularly been involved in worker rights violations over the past 3 years." />
        </p>
        <div className="space-y-2 mb-4">
          <TypewriterText text="(123) 456-7890" />
          <TypewriterText text="hr@cleanmax.com" />
          <TypewriterText text="3245 Vista Grande Blvd, Suite 201, Los Angeles, CA 90017" />
        </div>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardContent>
    </Card>
    <Card className="md:col-span-2">
      <CardHeader>
        <CardTitle>
          <Zap className="inline-block mr-2" />
          All Spark Win and Value Predictor
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <TypewriterText text="95%" className="font-semibold" />
          <TypewriterText text="Value: $21,500" className="font-semibold" />
        </div>
        <Progress value={95} className="mb-4" />
        <p className="text-sm mb-4">
          <TypewriterText text="This case is most similar to Fonseca vs. Acme Inc. in our case history with clear and irrefutable claims particularly per FEHA. Lean strongly on this along with Meal and Rest break issue to maximise claim value." />
        </p>
        <Button variant="outline" size="sm">
          <Pencil className="mr-2 h-4 w-4" />
          Edit
        </Button>
      </CardContent>
    </Card>
  </div>
)

const IntakeSummary = () => (
  <Card>
    <CardHeader>
      <CardTitle>
        <Zap className="inline-block mr-2" />
        AllSpark Intake Summary
      </CardTitle>
    </CardHeader>
    <CardContent>
      <TypewriterText text="Daniel v. CleanMax Services, Inc." className="font-semibold mb-2" />
      <TypewriterText text="8392 Oakdale Ave, Los Angeles, CA 91306" className="text-sm text-muted-foreground mb-4" />
      <TypewriterText text="Oct 13, 2023" className="text-sm mb-4" />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>CATEGORY</TableHead>
            <TableHead>DETAILS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Client Information</TableCell>
            <TableCell>
              <TypewriterText text="Name: Daniel Ramirez" />
              <TypewriterText text="Email: daniel.ramirez@gmail.com" />
              <TypewriterText text="Phone: +1 (818) 555-1234" />
              <TypewriterText text="Address: 8932 Oakdale Ave, Los Angeles, CA 91306" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Employment Details</TableCell>
            <TableCell>
              <TypewriterText text="Job Title: Janitorial Staff" />
              <TypewriterText text="Hourly Rate: $18.50" />
              <TypewriterText text="Employment Start Date: August 2, 2021" />
              <TypewriterText text="Employment End Date: May 15, 2024" />
              <TypewriterText text="Work Schedule: Mon-Fri, 6:00 am to 2:30 pm" />
              <TypewriterText text="Supervisor: Carlos Mendoza" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Meal/Rest Break Claims</TableCell>
            <TableCell>
              <TypewriterText text="Meal Break Violations: 4 times per week" />
              <TypewriterText text="Rest Break Violations: 5 times per week" />
              <TypewriterText text="Details: Frequently missed legally required breaks due to excessive workload" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Overtime Claims</TableCell>
            <TableCell>
              <TypewriterText text="Overtime Worked: 1 hour per day, 5 hours per week" />
              <TypewriterText text="Compensation: Client was not paid at the overtime rate" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button variant="outline" size="sm" className="mt-4">
        <Pencil className="mr-2 h-4 w-4" />
        Edit
      </Button>
    </CardContent>
  </Card>
)

const IssueSpotting = () => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>Matter View</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[600px] overflow-y-auto">
        <p className="text-sm mb-2">Matter Analysis: Ramirez, Daniel v. CleanMax Services, Inc.</p>
        <p className="text-sm mb-2">NEW RETAINER</p>
        <p className="text-sm mb-2">Case Name: Ramirez, Daniel v. CleanMax Services, Inc.</p>
        <p className="text-sm mb-2">Type: EMPR | ID: 204099 | File Ref: B6905</p>
        <p className="text-sm mb-2">Client Name: Daniel Ramirez</p>
        <p className="text-sm mb-2">Matter Anlys (read only)</p>
        <p className="text-sm mb-2">Client Hourly Rate: 18.50</p>
        <p className="text-sm mb-2">Employment Start Date: Monday 02 August 2021</p>
        <p className="text-sm mb-2">Employment End Date: 05/15/2024</p>
        <p className="text-sm mb-2">Job Title: Janitorial Staff</p>
        <p className="text-sm mb-2">Work Schedule (per day/week): Mon-Fri, 6:00 am to 2:30 pm</p>
        <p className="text-sm mb-2">Supervisor: Carlos Mendoza</p>
        <p className="text-sm mb-2">Reemployed? (Inc. date and comp): No, client is actively seeking new employment.</p>
        <p className="text-sm mb-2">Misclassification: Select</p>
        <p className="text-sm mb-2">Summarize Facts: 32-year-old, Hispanic, Male</p>
        <p className="text-sm mb-4">Worked for CleanMax Services, Inc. for nearly 3 years as a janitor in various commercial buildings. The client was responsible for cleaning and maintaining office spaces and restrooms. The client was paid on an hourly basis and received biweekly payments.</p>
        <p className="text-sm mb-2">--meal and rest breaks</p>
        <p className="text-sm mb-2">Client was frequently unable to take meal breaks due to tight schedules and high work demands.</p>
        <p className="text-sm mb-2">4x per week, client missed meal breaks.</p>
        <p className="text-sm mb-2">5x per week, client was unable to take rest breaks.</p>
        <p className="text-sm">--wt (wrongful termination)</p>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>
          <Zap className="inline-block mr-2" />
          AllSpark California Workers' Rights Issue Spotter
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm font-semibold mb-4">All Spark spotted 7 Claims found from reviewing the matter document</p>
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-2">Meal and Rest Break Claims</h4>
            <p className="text-sm">Client frequently missed legally required meal and rest breaks due to excessive workload. 4 meal break violations and 5 rest break violations per week.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Off the Clock</h4>
            <p className="text-sm">Client was required to begin work 15 minutes before the official start time each day to prepare equipment and materials, without compensation. 75 minutes of unpaid work per week.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Wrongful Termination</h4>
            <p className="text-sm">The wrongful termination involved violations of the FEHA and labor laws regarding meal and rest breaks, overtime pay, and final paycheck issuance.</p>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
)

const DemandAndNegotiation = () => (
  <div className="grid gap-6 md:grid-cols-2">
    <Card>
      <CardHeader>
        <CardTitle>
          <Zap className="inline-block mr-2" />
          AllSpark Demand Letter Generator
        </CardTitle>
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold mb-4">Demand Preview</h3>
        <div className="space-y-2 mb-4">
          <p className="text-sm"><span className="font-semibold">Matter:</span> Daniel Ramirez vs. CleanMax Services Inc.</p>
          <p className="text-sm"><span className="font-semibold">Claim Summary:</span> 7 claims per California Workers Rights</p>
          <p className="text-sm"><span className="font-semibold">Demand Summary:</span> $25,000</p>
        </div>
        <Button>Generate Demand</Button>
      </CardContent>
    </Card>
    <Card>
      <CardHeader>
        <CardTitle>Confidential Settlement Communication</CardTitle>
      </CardHeader>
      <CardContent className="max-h-[600px] overflow-y-auto">
        <TypewriterText text="(Cal. Evid. Code § 1152)" className="text-sm mb-2" />
        <TypewriterText text="October 10, 2024" className="text-sm mb-4" />
        <TypewriterText text="VIA FIRST CLASS MAIL AND/OR ELECTRONIC MAIL" className="text-sm mb-4" />
        <TypewriterText text="CleanMax Services, Inc." className="text-sm mb-2" />
        <TypewriterText text="1234 Business Ave, Suite 567" className="text-sm mb-2" />
        <TypewriterText text="Los Angeles, CA 90017" className="text-sm mb-4" />
        <TypewriterText text="Subject: Daniel Ramirez v. CleanMax Services, Inc." className="text-sm mb-4" />
        <TypewriterText text="Dear Sir or Madam," className="text-sm mb-4" />
        <TypewriterText text="AllSpark Legal represents Daniel Ramirez, who worked for CleanMax Services, Inc. (“CleanMax”) from August 2021 until May 2024 as janitorial staff. We specialize in employment claims and bring a wealth of experience in cases such as Mr. Ramirez’s." className="text-sm mb-4" />
        <TypewriterText text="Mr. Ramirez retained us to represent him on the following claims against CleanMax:" className="text-sm mb-4" />
        <TypewriterText text="Wrongful Termination: CleanMax wrongfully terminated Mr. Ramirez in retaliation for raising concerns about unsafe working conditions involving exposure to hazardous cleaning chemicals. This action violates public policy and the Fair Employment and Housing Act (FEHA)." className="text-sm mb-4" />
        <TypewriterText text="Meal Period and Rest Break Violations: Mr. Ramirez frequently missed legally required meal and rest breaks due to workload. CleanMax failed to provide Mr. Ramirez with compliant breaks 4 times per week for meal breaks and 5 times per week for rest breaks." className="text-sm mb-4" />
        <TypewriterText text="Off-the-Clock Work: Mr. Ramirez was required to work 15 minutes before his scheduled shift to..." className="text-sm" />
      </CardContent>
    </Card>
  </div>
)

export default function CaseDetails() {
  return (
    <div className="container mx-auto p-4">
      <Button variant="secondary" asChild>
        <Link href="/dashboard">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Matter Hub
        </Link>
      </Button>
      <h1 className="text-3xl font-bold my-6">Matter Hub | Ramirez vs. CleanMax Inc.</h1>
      <Tabs defaultValue="intake-analysis" className="space-y-4">
        <TabsList>
          <TabsTrigger value="intake-analysis">Intake Analysis</TabsTrigger>
          <TabsTrigger value="intake-summary">Intake Summary</TabsTrigger>
          <TabsTrigger value="issue-spotting">Issue Spotting</TabsTrigger>
          <TabsTrigger value="demand-negotiation">Demand & Negotiation</TabsTrigger>
        </TabsList>
        <TabsContent value="intake-analysis">
          <IntakeAnalysis />
        </TabsContent>
        <TabsContent value="intake-summary">
          <IntakeSummary />
        </TabsContent>
        <TabsContent value="issue-spotting">
          <IssueSpotting />
        </TabsContent>
        <TabsContent value="demand-negotiation">
          <DemandAndNegotiation />
        </TabsContent>
      </Tabs>
    </div>
  )
}