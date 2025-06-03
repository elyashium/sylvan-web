import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Leaf, Droplet, Sun, Thermometer, Flower, Twitter, Warehouse, Home, AlertTriangle, Sprout } from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-bgMain">
      {/* Header */}
      <header className="fixed top-0 z-10 w-full bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Leaf className="mr-2 text-primary" size={24} />
            <span className="text-xl font-semibold text-primary">Sylvan</span>
          </div>
          <div className="flex items-center space-x-4">
            <Link 
              to={isAuthenticated ? '/dashboard' : '/login'} 
              className="btn-primary"
            >
              {isAuthenticated ? 'Dashboard' : 'Login'}
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 md:pt-32 pb-16 md:pb-24 bg-gradient-to-b from-bgMain to-bgCard">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primaryLight/20 text-primary text-sm font-medium mb-4">
                <Flower size={16} className="mr-2" />
                <span>Emotion-Aware Plant Care</span>
              </div>
              <h1 className="mb-4 text-3xl font-bold text-textPrimary md:text-4xl lg:text-5xl leading-tight">
                Your Plants Have Feelings. <br />
                <span className="text-primary">Sylvan Understands Them.</span>
              </h1>
              <p className="mb-8 max-w-2xl text-lg text-textSecondary">
                The smart farming assistant that blends AI, IoT, and emotion-aware computing to care for your plants like a human farmer with decades of intuition.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Link 
                  to={isAuthenticated ? '/dashboard' : '/login'} 
                  className="btn-primary text-lg px-8 py-3"
                >
                  {isAuthenticated ? 'View Dashboard' : 'Get Started'}
                </Link>
                <a 
                  href="#features" 
                  className="btn-outline text-lg px-8 py-3"
                >
                  Learn More
                </a>
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <div className="relative mx-auto max-w-md">
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-accent/20 rounded-full z-0"></div>
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primaryLight/20 rounded-full z-0"></div>
                <div className="relative z-10 bg-white rounded-2xl shadow-lg overflow-hidden">
                  <div className="p-6 border-b border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-textPrimary flex items-center">
                        <Sprout className="mr-2 text-primary" size={20} />
                        Monstera Deliciosa
                      </h3>
                      <span className="px-2 py-1 bg-success/20 text-success text-xs font-medium rounded-full">Healthy</span>
                    </div>
                    <div className="flex items-center text-sm text-textSecondary">
                      <span className="flex items-center">
                        <AlertTriangle size={14} className="mr-1 text-warning" />
                        Needs water soon
                      </span>
                    </div>
                  </div>
                  <div className="p-6 grid grid-cols-2 gap-4">
                    <div className="flex flex-col items-center p-3 bg-bgCard rounded-lg">
                      <Droplet size={24} className="text-info mb-1" />
                      <span className="text-xs text-textSecondary">Water</span>
                      <span className="font-semibold">68%</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-bgCard rounded-lg">
                      <Sun size={24} className="text-warning mb-1" />
                      <span className="text-xs text-textSecondary">Light</span>
                      <span className="font-semibold">Good</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-bgCard rounded-lg">
                      <Thermometer size={24} className="text-error mb-1" />
                      <span className="text-xs text-textSecondary">Temp</span>
                      <span className="font-semibold">24°C</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-bgCard rounded-lg">
                      <Twitter size={24} className="text-info mb-1" />
                      <span className="text-xs text-textSecondary">Mood</span>
                      <span className="font-semibold">Happy</span>
                    </div>
                  </div>
                  <div className="p-4 bg-bgCard border-t border-border">
                    <div className="flex items-center text-sm">
                      <Twitter size={16} className="mr-2 text-info" />
                      <p className="text-textSecondary italic">
                        "Could use a drink soon, but otherwise feeling pretty good today! #PlantLife"
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* User Journeys Section */}
      <section id="journeys" className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-4 text-center text-2xl font-bold text-textPrimary md:text-3xl">
            Choose Your Journey
          </h2>
          <p className="mb-12 text-center text-textSecondary max-w-3xl mx-auto">
            Whether you're caring for houseplants or managing commercial farms, Sylvan adapts to your needs with specialized features.
          </p>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl bg-bgCard p-8 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-6 inline-flex rounded-full bg-primaryLight/10 p-4 text-primary">
                <Home size={28} />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-textPrimary">Household</h3>
              <p className="mb-6 text-textSecondary">
                Connect your houseplants to ESP32-based sensing units and receive passive-aggressive tweets about their wellbeing. Monitor water levels, humidity, light, and temperature all from your phone.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center text-textSecondary">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-white text-xs">✓</span>
                  Real-time plant emotional status
                </li>
                <li className="flex items-center text-textSecondary">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-white text-xs">✓</span>
                  Twitter-based plant communication
                </li>
                <li className="flex items-center text-textSecondary">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-white text-xs">✓</span>
                  Personalized care recommendations
                </li>
              </ul>
              <Link 
                to={isAuthenticated ? '/dashboard' : '/login?type=household'} 
                className="btn-primary inline-block"
              >
                Start Household Journey
              </Link>
            </div>
            
            <div className="rounded-xl bg-bgCard p-8 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-6 inline-flex rounded-full bg-secondary/10 p-4 text-secondary">
                <Warehouse size={28} />
              </div>
              <h3 className="mb-3 text-2xl font-semibold text-textPrimary">Commercial</h3>
              <p className="mb-6 text-textSecondary">
                Scale your farming operations with enterprise-grade monitoring. From a single farm to hundreds of greenhouses, get accessibility-first features with Text-to-Speech for rural areas.
              </p>
              <ul className="mb-8 space-y-3">
                <li className="flex items-center text-textSecondary">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-white text-xs">✓</span>
                  Enterprise-scale monitoring
                </li>
                <li className="flex items-center text-textSecondary">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-white text-xs">✓</span>
                  Offline resilience & data sync
                </li>
                <li className="flex items-center text-textSecondary">
                  <span className="mr-2 inline-flex h-5 w-5 items-center justify-center rounded-full bg-success text-white text-xs">✓</span>
                  Text-to-Speech accessibility
                </li>
              </ul>
              <Link 
                to={isAuthenticated ? '/dashboard' : '/login?type=commercial'} 
                className="btn-secondary inline-block"
              >
                Start Commercial Journey
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-bgMain">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-4 text-center text-2xl font-bold text-textPrimary md:text-3xl">
            Smart Features for Smarter Farming
          </h2>
          <p className="mb-12 text-center text-textSecondary max-w-3xl mx-auto">
            Sylvan combines cutting-edge technology with intuitive design to create the ultimate plant care experience.
          </p>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Droplet size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Water Management</h3>
              <p className="text-textSecondary">
                Monitor water tank levels and receive timely alerts when your plants need hydration.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Thermometer size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Environmental Monitoring</h3>
              <p className="text-textSecondary">
                Track temperature, humidity, and light conditions to ensure optimal growing environments.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Twitter size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Plant Twitter</h3>
              <p className="text-textSecondary">
                Your plants tweet their feelings in a passive-aggressive, humorous way to let you know their needs.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <AlertTriangle size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Predictive Health Alerts</h3>
              <p className="text-textSecondary">
                AI-powered predictions alert you to potential issues before they become serious problems.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Flower size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">ESP32 Integration</h3>
              <p className="text-textSecondary">
                Connect your plants to smart ESP32-based sensing units for continuous monitoring and data collection.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md border border-border">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Sprout size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Natural Language Reports</h3>
              <p className="text-textSecondary">
                Receive easy-to-understand reports about your plants' health and needs in natural language.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary to-primaryLight py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Ready to give your plants a voice?
            </h2>
            <p className="mb-8 text-lg text-white/90">
              Join the Sylvan community and transform your plant care experience with emotion-aware technology.
            </p>
            <Link 
              to={isAuthenticated ? '/dashboard' : '/login'} 
              className="inline-block rounded-md bg-white px-8 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-white/90"
            >
              {isAuthenticated ? 'Go to Dashboard' : 'Get Started Now'}
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 flex items-center md:mb-0">
              <Leaf className="mr-2 text-primary" size={20} />
              <span className="text-lg font-semibold text-primary">Sylvan</span>
            </div>
            <div className="text-center text-textSecondary md:text-right">
              <p>&copy; {new Date().getFullYear()} Sylvan - Emotion-Aware Smart Farming Assistant. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;