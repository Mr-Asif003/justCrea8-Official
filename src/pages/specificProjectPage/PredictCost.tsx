import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import {
  Input
} from "@/components/ui/input";
import {
  Button
} from "@/components/ui/button";
import {
  Label
} from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

const cocomoModes = {
  Organic: { a: 2.4, b: 1.05, c: 2.5, d: 0.38 },
  "Semi-detached": { a: 3.0, b: 1.12, c: 2.5, d: 0.35 },
  Embedded: { a: 3.6, b: 1.20, c: 2.5, d: 0.32 }
};

export default function CostEstimator() {
  const [kloc, setKloc] = useState(0);
  const [mode, setMode] = useState("Organic");
  const [results, setResults] = useState(null);

  const calculateCOCOMO = () => {
    const { a, b, c, d } = cocomoModes[mode];
    const effort = a * Math.pow(kloc, b);
    const time = c * Math.pow(effort, d);
    const staff = effort / time;
    setResults({ effort, time, staff });
  };

  return (
    <div className="min-h-screen p-8 bg-background text-foreground space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>📐 Project Cost & Effort Estimator (COCOMO Model)</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label>KLOC (Thousands of Lines of Code)</Label>
            <Input
              type="number"
              value={kloc}
              onChange={(e) => setKloc(Number(e.target.value))}
              placeholder="e.g. 50"
            />
          </div>

          <div>
            <Label>Project Mode</Label>
            <Select value={mode} onValueChange={setMode}>
              <SelectTrigger>
                <SelectValue placeholder="Select Mode" />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(cocomoModes).map((m) => (
                  <SelectItem key={m} value={m}>{m}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button onClick={calculateCOCOMO} className="col-span-full">Estimate</Button>
        </CardContent>
      </Card>

      {results && (
        <Card>
          <CardHeader>
            <CardTitle>📊 Estimation Results</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p><strong>Effort:</strong> {results.effort.toFixed(2)} Person-Months</p>
            <p><strong>Time:</strong> {results.time.toFixed(2)} Months</p>
            <p><strong>Team Size:</strong> {results.staff.toFixed(2)} Persons</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
