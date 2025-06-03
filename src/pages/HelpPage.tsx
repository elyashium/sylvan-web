import { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, Mail, MessageSquare, Book, FileText } from 'lucide-react';

type FAQItem = {
  question: string;
  answer: string;
};

const HelpPage = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqItems: FAQItem[] = [
    {
      question: "How do I add a new plant to my dashboard?",
      answer: "To add a new plant, go to the Dashboard and click the 'Add Plant' button. Fill in the required information about your plant, including its location, species, and any sensor IDs if applicable."
    },
    {
      question: "How does the plant monitoring system work?",
      answer: "Sylvan uses IoT sensors to monitor soil moisture, light levels, temperature, and humidity around your plants. The data is sent to our servers and displayed on your dashboard, allowing you to track your plants' health and receive notifications when they need attention."
    },
    {
      question: "Can I use Sylvan without sensors?",
      answer: "Yes! While sensors provide real-time data, you can still use Sylvan to track your plants manually. You can log watering schedules, add notes, and receive care reminders based on the plant species you've added."
    },
    {
      question: "How do I interpret the plant health indicators?",
      answer: "Green indicators show that your plant is healthy. Yellow means the plant needs attention soon (like watering or more light). Red indicates urgent attention is needed as the plant is experiencing stress conditions that could harm it."
    },
    {
      question: "What do the Plant Tweets represent?",
      answer: "Plant Tweets are a fun way to personify your plants! Based on sensor data and care history, we generate messages as if your plants were posting social media updates about how they're feeling."
    }
  ];

  const toggleFAQ = (index: number) => {
    if (openFAQ === index) {
      setOpenFAQ(null);
    } else {
      setOpenFAQ(index);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-textPrimary flex items-center">
          <HelpCircle className="mr-2 text-primary" size={24} />
          Help Center
        </h1>
        <p className="text-textSecondary mt-1">Find answers to common questions and learn how to use Sylvan</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-textPrimary mb-4">Support Options</h2>
            <div className="space-y-3">
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-bgMain text-textPrimary">
                <Mail size={18} className="mr-3 text-primary" />
                <span>Contact Support</span>
              </a>
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-bgMain text-textPrimary">
                <MessageSquare size={18} className="mr-3 text-primary" />
                <span>Live Chat</span>
              </a>
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-bgMain text-textPrimary">
                <Book size={18} className="mr-3 text-primary" />
                <span>User Guide</span>
              </a>
              <a href="#" className="flex items-center p-2 rounded-md hover:bg-bgMain text-textPrimary">
                <FileText size={18} className="mr-3 text-primary" />
                <span>API Documentation</span>
              </a>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-sm p-4">
            <h2 className="font-semibold text-textPrimary mb-4">Frequently Asked Questions</h2>
            <div className="space-y-3">
              {faqItems.map((item, index) => (
                <div key={index} className="border border-border rounded-md overflow-hidden">
                  <button
                    className="flex items-center justify-between w-full p-4 text-left bg-bgMain hover:bg-bgMain/80"
                    onClick={() => toggleFAQ(index)}
                  >
                    <span className="font-medium text-textPrimary">{item.question}</span>
                    {openFAQ === index ? (
                      <ChevronUp size={18} className="text-textSecondary" />
                    ) : (
                      <ChevronDown size={18} className="text-textSecondary" />
                    )}
                  </button>
                  {openFAQ === index && (
                    <div className="p-4 bg-white">
                      <p className="text-textSecondary">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpPage; 