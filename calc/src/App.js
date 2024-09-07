import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { HelpCircle } from 'lucide-react';

const measurementGuides = {
  height: "Stand upright against a wall, heels together. Mark the top of your head on the wall and measure from the floor to this mark.",
  neck: "Measure around the neck at the height of the larynx (Adam's apple). Keep the tape horizontal.",
  waist: "Measure at the narrowest part of the torso, usually just above the belly button. Keep the tape horizontal.",
  hip: "Measure at the widest part of the hips/buttocks. Keep the tape horizontal."
};

const MeasurementGuide = ({ guides }) => (
  <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" size="icon">
        <HelpCircle className="h-4 w-4" />
      </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>How to Take Measurements</DialogTitle>
        <DialogDescription>
          Follow these guidelines for accurate measurements:
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        {Object.entries(guides).map(([key, value]) => (
          <div key={key} className="grid grid-cols-4 items-center gap-4">
            <label htmlFor={key} className="text-right font-medium capitalize">
              {key}:
            </label>
            <p className="col-span-3 text-sm">{value}</p>
          </div>
        ))}
      </div>
    </DialogContent>
  </Dialog>
);

const BodyFatCalculator = () => {
  const [gender, setGender] = useState('');
  const [measurements, setMeasurements] = useState({
    weight: '',
    height: '',
    neck: '',
    waist: '',
    hip: '',
    age: '',
  });
  const [results, setResults] = useState(null);
  const [story, setStory] = useState('');

  const handleInputChange = (e) => {
    setMeasurements({ ...measurements, [e.target.name]: e.target.value });
  };

  const calculateBodyFat = () => {
    // ... (keep the existing calculation logic)
  };

  const generateStory = (bmiCategory, bodyFatCategory, averageBodyFat) => {
    // ... (keep the existing story generation logic)
  };

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-blue-100 to-purple-100">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="text-2xl font-bold">Your Body Composition Journey</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Select onValueChange={(value) => setGender(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select gender" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
              <MeasurementGuide guides={measurementGuides} />
            </div>

            <Input
              type="number"
              name="age"
              placeholder="Age (years)"
              value={measurements.age}
              onChange={handleInputChange}
              className="w-full h-10"
            />

            <Input
              type="number"
              name="weight"
              placeholder="Weight (kg)"
              value={measurements.weight}
              onChange={handleInputChange}
              className="w-full h-10"
            />

            <Input
              type="number"
              name="height"
              placeholder="Height (cm)"
              value={measurements.height}
              onChange={handleInputChange}
              className="w-full h-10"
            />

            <Input
              type="number"
              name="neck"
              placeholder="Neck circumference (cm)"
              value={measurements.neck}
              onChange={handleInputChange}
              className="w-full h-10"
            />

            <Input
              type="number"
              name="waist"
              placeholder="Waist circumference (cm)"
              value={measurements.waist}
              onChange={handleInputChange}
              className="w-full h-10"
            />

            {gender === 'female' && (
              <Input
                type="number"
                name="hip"
                placeholder="Hip circumference (cm)"
                value={measurements.hip}
                onChange={handleInputChange}
                className="w-full h-10"
              />
            )}

            <Button onClick={calculateBodyFat} className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded h-10">
              Discover Your Body Composition
            </Button>
          </div>

          {results && (
            <div className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-bold text-xl mb-2 text-purple-600">Your Body Composition Story</h3>
              <p className="mb-4 text-gray-700">{story}</p>
              <div className="space-y-2">
                <p><span className="font-semibold text-blue-600">BMI:</span> {results.bmi.toFixed(2)} - {results.bmiCategory}</p>
                <p><span className="font-semibold text-blue-600">Average Body Fat:</span> {results.averageBodyFat.toFixed(2)}% - {results.bodyFatCategory}</p>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={[
                  {name: 'BMI Method', value: results.bmiBodyFat},
                  {name: 'NHRC', value: results.nhrcBodyFat},
                  {name: 'US Navy', value: results.usNavyBodyFat},
                ]}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BodyFatCalculator;