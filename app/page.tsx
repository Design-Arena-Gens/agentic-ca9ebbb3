'use client';

import { useState } from 'react';

interface SceneData {
  location: string;
  activity: string;
  food: string;
  mood: string;
  details: string;
}

export default function Home() {
  const [currentScene, setCurrentScene] = useState(1);
  const [scenes, setScenes] = useState<SceneData[]>([
    {
      location: 'वाराणसी के लाल बहादुर शास्त्री अंतर्राष्ट्रीय हवाई अड्डे के एंटरेंस के बाहर',
      activity: 'food vlogging शुरू करना',
      food: 'स्ट्रीट फूड का सफर',
      mood: 'काफी ज्यादा एक्साइटेड और एनर्जेटिक',
      details: 'पहली बार प्लेन से आगरा जाकर वहां के फेमस फूड और पेठे को ट्राई करने',
    },
  ]);

  const [formData, setFormData] = useState<SceneData>({
    location: '',
    activity: '',
    food: '',
    mood: '',
    details: '',
  });

  const [generatedPrompt, setGeneratedPrompt] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);

  const generatePrompt = (sceneNum: number, sceneData: SceneData) => {
    const prompt = `मै अपनी खुद की इमेज यानी कि अपने फेस का यूस कर के Google Veo 3.1 में फ्रेम टू वीडियो से रियलिस्टिक Food Vlog बनाऊंगा।

इस कैरेक्टर के चेहरे और हेयर स्टाइल में बिना किसी बदलाव के:

📍 लोकेशन: ${sceneData.location}

🎬 सीन डिटेल्स:
यह कैरेक्टर ${sceneData.location} खड़ा है। पीछे कुछ गाड़िया और कुछ लोग आते जाते दिख रहे हैं - बिल्कुल रियल लगना चाहिए जैसा एक एयरपोर्ट के बाहर होता है वैसा ही।

🍽️ Food Vlogging Context:
यह कैरेक्टर ${sceneData.details} जा रहा है। ${sceneData.mood} दिख रहा है।

🎥 Action:
पार्ट ${sceneNum} - यह कैरेक्टर ${sceneData.activity} है। इस कैरेक्टर के हाथ में जो कैमरा है, वो stable दिखना चाहिए जैसे gimbal पर हो।

📸 Technical Requirements:
- बिल्कुल रियलिस्टिक लुक
- कैरेक्टर के facial features consistent रखें
- Natural lighting और movements
- Food vlogging के लिए proper camera angles
- Background में realistic crowd और activity`;

    return prompt;
  };

  const handleGeneratePrompt = () => {
    const prompt = generatePrompt(currentScene, scenes[currentScene - 1]);
    setGeneratedPrompt(prompt);
    setShowPrompt(true);
  };

  const handleAddScene = () => {
    if (
      formData.location &&
      formData.activity &&
      formData.food &&
      formData.mood &&
      formData.details
    ) {
      setScenes([...scenes, formData]);
      setCurrentScene(scenes.length + 1);
      setFormData({
        location: '',
        activity: '',
        food: '',
        mood: '',
        details: '',
      });
      setShowPrompt(false);
    }
  };

  const handleSceneChange = (sceneNum: number) => {
    setCurrentScene(sceneNum);
    setShowPrompt(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPrompt);
    alert('Prompt copied to clipboard!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-yellow-50 to-red-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-orange-600 mb-4">
            🍽️ Food Vlog Prompt Generator
          </h1>
          <p className="text-xl text-gray-700">
            Google Veo 3.1 के लिए Realistic Food Vlogging Prompts बनाएं
          </p>
        </div>

        {/* Scene Navigator */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">📹 Scenes</h2>
          <div className="flex flex-wrap gap-3 mb-6">
            {scenes.map((_, index) => (
              <button
                key={index}
                onClick={() => handleSceneChange(index + 1)}
                className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                  currentScene === index + 1
                    ? 'bg-orange-500 text-white shadow-lg scale-105'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Part {index + 1}
              </button>
            ))}
          </div>

          {/* Current Scene Details */}
          <div className="bg-orange-50 rounded-xl p-6 mb-6">
            <h3 className="text-xl font-bold text-orange-600 mb-4">
              Part {currentScene} Details:
            </h3>
            <div className="space-y-3 text-gray-700">
              <p>
                <strong>📍 Location:</strong> {scenes[currentScene - 1].location}
              </p>
              <p>
                <strong>🎬 Activity:</strong> {scenes[currentScene - 1].activity}
              </p>
              <p>
                <strong>🍽️ Food Theme:</strong> {scenes[currentScene - 1].food}
              </p>
              <p>
                <strong>😊 Mood:</strong> {scenes[currentScene - 1].mood}
              </p>
              <p>
                <strong>📝 Details:</strong> {scenes[currentScene - 1].details}
              </p>
            </div>
          </div>

          <button
            onClick={handleGeneratePrompt}
            className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-orange-600 transition-colors shadow-lg"
          >
            ✨ Generate Prompt for Part {currentScene}
          </button>
        </div>

        {/* Generated Prompt Display */}
        {showPrompt && (
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-800">
                📝 Generated Prompt (Part {currentScene})
              </h2>
              <button
                onClick={copyToClipboard}
                className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition-colors"
              >
                📋 Copy
              </button>
            </div>
            <div className="bg-gray-50 rounded-xl p-6 whitespace-pre-wrap text-gray-800 font-mono text-sm border-2 border-orange-200">
              {generatedPrompt}
            </div>
          </div>
        )}

        {/* Add New Scene Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            ➕ Add Next Scene
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                📍 Location (कहाँ है?)
              </label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                placeholder="e.g., आगरा के ताजमहल के सामने"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🎬 Activity (क्या कर रहा है?)
              </label>
              <input
                type="text"
                value={formData.activity}
                onChange={(e) =>
                  setFormData({ ...formData, activity: e.target.value })
                }
                placeholder="e.g., आगरा का फेमस पेठा खा रहा है"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                🍽️ Food Theme (कौन सा खाना?)
              </label>
              <input
                type="text"
                value={formData.food}
                onChange={(e) =>
                  setFormData({ ...formData, food: e.target.value })
                }
                placeholder="e.g., आगरा का फेमस पेठा और चाट"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                😊 Mood (कैसा feel हो रहा है?)
              </label>
              <input
                type="text"
                value={formData.mood}
                onChange={(e) =>
                  setFormData({ ...formData, mood: e.target.value })
                }
                placeholder="e.g., बहुत excited और hungry"
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                📝 Additional Details
              </label>
              <textarea
                value={formData.details}
                onChange={(e) =>
                  setFormData({ ...formData, details: e.target.value })
                }
                placeholder="e.g., पहली बार आगरा के street food को explore कर रहा है"
                rows={3}
                className="w-full p-3 border-2 border-gray-300 rounded-lg focus:border-orange-500 focus:outline-none"
              />
            </div>

            <button
              onClick={handleAddScene}
              className="w-full bg-green-500 text-white py-4 rounded-xl font-bold text-lg hover:bg-green-600 transition-colors shadow-lg"
            >
              ✅ Add Scene & Generate Next Part
            </button>
          </div>
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-orange-100 rounded-2xl p-6 border-2 border-orange-300">
          <h3 className="text-lg font-bold text-orange-800 mb-3">
            💡 कैसे use करें:
          </h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-700">
            <li>Current scene के लिए "Generate Prompt" बटन दबाएं</li>
            <li>Generated prompt को copy करें</li>
            <li>Google Veo 3.1 में paste करें और video generate करें</li>
            <li>अगले scene के लिए details भरें और "Add Scene" दबाएं</li>
            <li>इस तरह अपनी पूरी food vlog बनाते जाएं!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
