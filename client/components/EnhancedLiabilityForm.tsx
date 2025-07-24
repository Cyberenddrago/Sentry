import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Shield, Save, AlertCircle, ArrowRight } from "lucide-react";
import { Job, User } from "@shared/types";

interface LiabilityFormData {
  id: string;
  jobId: string;
  date: string;
  insurance: string;
  claim_number: string;
  client: string;
  plumber: string;

  // Main assessment items (matching predefined form field IDs)
  existing_pipes_fittings: string;
  roof_entry: string;
  geyser_enclosure: string;
  wiring_electrical_alarm: string;
  waterproofing: string;
  pipes_not_secured: string;
  not_listed_comments: string;
  increase_decrease_pressure: string;

  // Before/After sections (matching predefined form field IDs)
  water_hammer_before: string;
  water_hammer_after: string;
  pressure_test_before: string;
  pressure_test_after: string;
  thermostat_setting_before: string;
  thermostat_setting_after: string;
  external_isolator_before: string;
  external_isolator_after: string;
  number_of_geysers_before: string;
  number_of_geysers_after: string;
  balanced_system_before: string;
  balanced_system_after: string;
  non_return_valve_before: string;
  non_return_valve_after: string;

  general_comments: string;
}

interface EnhancedLiabilityFormProps {
  job: Job;
  assignedStaff: User | null;
  onSubmit: (formData: LiabilityFormData) => void;
  existingData?: LiabilityFormData;
}

export function EnhancedLiabilityForm({
  job,
  assignedStaff,
  onSubmit,
  existingData,
}: EnhancedLiabilityFormProps) {
  const [formData, setFormData] = useState<LiabilityFormData>(() => ({
    id: existingData?.id || `liability-${Date.now()}`,
    jobId: job.id,
    date: existingData?.date || new Date().toISOString().split("T")[0],
    insurance:
      existingData?.insurance || job.underwriter || job.Underwriter || "",
    claim_number: existingData?.claim_number || job.claimNo || job.ClaimNo || "",
    client: existingData?.client || job.insuredName || job.InsuredName || "",
    plumber: existingData?.plumber || assignedStaff?.name || "",

    existing_pipes_fittings: existingData?.existing_pipes_fittings || "",
    roof_entry: existingData?.roof_entry || "",
    geyser_enclosure: existingData?.geyser_enclosure || "",
    wiring_electrical_alarm: existingData?.wiring_electrical_alarm || "",
    waterproofing: existingData?.waterproofing || "",
    pipes_not_secured: existingData?.pipes_not_secured || "",
    not_listed_comments: existingData?.not_listed_comments || "",
    increase_decrease_pressure: existingData?.increase_decrease_pressure || "",

    water_hammer_before: existingData?.water_hammer_before || "",
    water_hammer_after: existingData?.water_hammer_after || "",
    pressure_test_before: existingData?.pressure_test_before || "",
    pressure_test_after: existingData?.pressure_test_after || "",
    thermostat_setting_before: existingData?.thermostat_setting_before || "",
    thermostat_setting_after: existingData?.thermostat_setting_after || "",
    external_isolator_before: existingData?.external_isolator_before || "",
    external_isolator_after: existingData?.external_isolator_after || "",
    number_of_geysers_before: existingData?.number_of_geysers_before || "",
    number_of_geysers_after: existingData?.number_of_geysers_after || "",
    balanced_system_before: existingData?.balanced_system_before || "",
    balanced_system_after: existingData?.balanced_system_after || "",
    non_return_valve_before: existingData?.non_return_valve_before || "",
    non_return_valve_after: existingData?.non_return_valve_after || "",

    general_comments: existingData?.general_comments || "",
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof LiabilityFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const BeforeAfterField = ({
    label,
    beforeField,
    afterField,
  }: {
    label: string;
    beforeField: keyof LiabilityFormData;
    afterField: keyof LiabilityFormData;
  }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
      <div className="font-medium text-sm">{label}</div>
      <div className="space-y-1">
        <Label className="text-xs text-gray-600">Before</Label>
        <Input
          value={formData[beforeField] as string}
          onChange={(e) => updateField(beforeField, e.target.value)}
          placeholder="Before value"
          className="text-sm"
        />
      </div>
      <div className="space-y-1">
        <Label className="text-xs text-gray-600">After</Label>
        <Input
          value={formData[afterField] as string}
          onChange={(e) => updateField(afterField, e.target.value)}
          placeholder="After value"
          className="text-sm"
        />
      </div>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-600" />
            Enhanced Liability Waiver Form
            <Badge variant="outline" className="ml-2">
              {job.title}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Header Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 bg-blue-50 rounded-lg">
              <div>
                <Label className="text-sm font-medium">Date</Label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) => updateField("date", e.target.value)}
                  className="text-sm bg-white"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Insurance</Label>
                <Input
                  value={formData.insurance}
                  onChange={(e) => updateField("insurance", e.target.value)}
                  className="text-sm bg-white"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-green-600">
                  Claim Number *
                </Label>
                <Input
                  value={formData.claim_number}
                  onChange={(e) => updateField("claim_number", e.target.value)}
                  className="text-sm bg-white"
                  placeholder="Auto-filled from job"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Client</Label>
                <Input
                  value={formData.client}
                  onChange={(e) => updateField("client", e.target.value)}
                  className="text-sm bg-white"
                />
              </div>
              <div>
                <Label className="text-sm font-medium">Plumber</Label>
                <Input
                  value={formData.plumber}
                  onChange={(e) => updateField("plumber", e.target.value)}
                  className="text-sm bg-white"
                />
              </div>
            </div>

            <Separator />

            {/* Main Assessment Items */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                Primary Assessment Items
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Existing Pipes/Fittings</Label>
                  <Input
                    value={formData.existing_pipes_fittings}
                    onChange={(e) =>
                      updateField("existing_pipes_fittings", e.target.value)
                    }
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
                <div>
                  <Label>Roof Entry</Label>
                  <Input
                    value={formData.roof_entry}
                    onChange={(e) => updateField("roof_entry", e.target.value)}
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
                <div>
                  <Label>Geyser Enclosure</Label>
                  <Input
                    value={formData.geyser_enclosure}
                    onChange={(e) =>
                      updateField("geyser_enclosure", e.target.value)
                    }
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
                <div>
                  <Label>Wiring (Electrical/Alarm)</Label>
                  <Input
                    value={formData.wiring_electrical_alarm}
                    onChange={(e) =>
                      updateField("wiring_electrical_alarm", e.target.value)
                    }
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
                <div>
                  <Label>Waterproofing</Label>
                  <Input
                    value={formData.waterproofing}
                    onChange={(e) =>
                      updateField("waterproofing", e.target.value)
                    }
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
                <div>
                  <Label>Pipes Not Secured</Label>
                  <Input
                    value={formData.pipes_not_secured}
                    onChange={(e) =>
                      updateField("pipes_not_secured", e.target.value)
                    }
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
                <div>
                  <Label>Not Listed (Note by Comments)</Label>
                  <Input
                    value={formData.not_listed_comments}
                    onChange={(e) =>
                      updateField("not_listed_comments", e.target.value)
                    }
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
                <div>
                  <Label>Increase/Decrease in Pressure</Label>
                  <Input
                    value={formData.increase_decrease_pressure}
                    onChange={(e) =>
                      updateField("increase_decrease_pressure", e.target.value)
                    }
                    placeholder="Enter assessment or 'X'"
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Before/After Sections */}
            <div>
              <h3 className="text-lg font-medium mb-4 flex items-center">
                <ArrowRight className="h-5 w-5 mr-2 text-green-600" />
                Before/After Comparisons
              </h3>
              <div className="space-y-4">
                <BeforeAfterField
                  label="Water Hammer"
                  beforeField="water_hammer_before"
                  afterField="water_hammer_after"
                />
                <BeforeAfterField
                  label="Pressure Test (Rating)"
                  beforeField="pressure_test_before"
                  afterField="pressure_test_after"
                />
                <BeforeAfterField
                  label="Thermostat Setting"
                  beforeField="thermostat_setting_before"
                  afterField="thermostat_setting_after"
                />
                <BeforeAfterField
                  label="External Isolator"
                  beforeField="external_isolator_before"
                  afterField="external_isolator_after"
                />
                <BeforeAfterField
                  label="Number of Geysers on Property"
                  beforeField="number_of_geysers_before"
                  afterField="number_of_geysers_after"
                />
                <BeforeAfterField
                  label="Balanced System"
                  beforeField="balanced_system_before"
                  afterField="balanced_system_after"
                />
                <BeforeAfterField
                  label="Non Return Valve"
                  beforeField="non_return_valve_before"
                  afterField="non_return_valve_after"
                />
              </div>
            </div>

            <Separator />

            {/* General Comments */}
            <div>
              <Label>General Comments</Label>
              <Textarea
                value={formData.general_comments}
                onChange={(e) =>
                  updateField("general_comments", e.target.value)
                }
                placeholder="Enter any additional comments from staff assessment..."
                rows={4}
                className="resize-none"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end space-x-4 pt-6 border-t">
              <Button type="button" variant="outline">
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Save className="h-4 w-4 mr-2" />
                Submit Liability Form
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Form Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Before/After Fields:</strong> Enter numbers, words, or
              simply "X" as needed for each assessment item.
            </p>
            <p>
              <strong>Primary Items:</strong> Assess each item and mark with
              appropriate values or "X" if not applicable.
            </p>
            <p>
              <strong>Additional Comments:</strong> Use this section to provide
              detailed notes on any specific findings or recommendations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
