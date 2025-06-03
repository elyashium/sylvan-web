import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity, MapPin, Cloud, Zap, BarChart2, Settings } from 'lucide-react';

const LandingPage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-bgMain">
      {/* Header */}
      <header className="fixed top-0 z-10 w-full bg-white shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center">
            <Activity className="mr-2 text-primary" size={24} />
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
      <section className="pt-24 md:pt-32">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="mb-4 text-3xl font-bold text-textPrimary md:text-4xl lg:text-5xl">
              Intelligent Sensor Monitoring
            </h1>
            <p className="mb-8 max-w-2xl text-lg text-textSecondary">
              Track, analyze, and optimize your environmental data with our advanced sensor monitoring platform.
            </p>
            <Link 
              to={isAuthenticated ? '/dashboard' : '/login'} 
              className="btn-primary text-lg px-8 py-3"
            >
              {isAuthenticated ? 'View Dashboard' : 'Get Started'}
            </Link>
          </div>
          
          <div className="mt-12 flex justify-center">
            <div className="relative aspect-video w-full max-w-4xl overflow-hidden rounded-lg shadow-lg">
              <img 
                src="https://images.pexels.com/photos/7054542/pexels-photo-7054542.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="Dashboard preview" 
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="mb-12 text-center text-2xl font-bold text-textPrimary md:text-3xl">
            Key Features
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <MapPin size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Geolocation Tracking</h3>
              <p className="text-textSecondary">
                Monitor all your sensors across different locations with precise geolocation data.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Activity size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Real-time Monitoring</h3>
              <p className="text-textSecondary">
                Get instant updates and alerts from your sensors with real-time data monitoring.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Cloud size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Cloud Integration</h3>
              <p className="text-textSecondary">
                Access your data from anywhere with our secure cloud-based infrastructure.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Zap size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Intelligent Alerts</h3>
              <p className="text-textSecondary">
                Receive smart notifications when your sensors detect anomalies or exceed thresholds.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <BarChart2 size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Advanced Analytics</h3>
              <p className="text-textSecondary">
                Gain insights from your data with powerful analytics and visualization tools.
              </p>
            </div>
            
            <div className="rounded-lg bg-white p-6 shadow-sm transition-all duration-200 hover:shadow-md">
              <div className="mb-4 inline-flex rounded-full bg-primaryLight/10 p-3 text-primary">
                <Settings size={24} />
              </div>
              <h3 className="mb-2 text-xl font-semibold text-textPrimary">Customizable Dashboard</h3>
              <p className="text-textSecondary">
                Personalize your monitoring experience with customizable dashboards and reports.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="mb-4 text-2xl font-bold text-white md:text-3xl">
              Ready to optimize your sensor monitoring?
            </h2>
            <p className="mb-8 text-lg text-white/80">
              Join thousands of users who trust Sylvan for their environmental monitoring needs.
            </p>
            <Link 
              to={isAuthenticated ? '/dashboard' : '/login'} 
              className="inline-block rounded-md bg-white px-6 py-3 font-semibold text-primary transition-colors duration-200 hover:bg-white/90"
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
              <Activity className="mr-2 text-primary" size={20} />
              <span className="text-lg font-semibold text-primary">Sylvan</span>
            </div>
            <div className="text-center text-textSecondary md:text-right">
              <p>&copy; {new Date().getFullYear()} Sylvan. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;