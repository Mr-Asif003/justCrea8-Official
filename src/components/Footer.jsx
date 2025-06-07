import React from 'react';
import { Link } from 'react-router-dom';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  Award,
  Heart,
  Linkedin
} from 'lucide-react';

const Footer = ({
  brand = 'JustCrea8',
  owner = 'Asif Khan',
  description = 'A short description about your platform or service goes here.',
  socials = [
    { icon: <Instagram className="h-5 w-5" />, href: 'https://www.instagram.com/_.mr_asif_/' },
    { icon: <Linkedin className="h-5 w-5" />, href: 'https://www.linkedin.com/in/asif-khan003' },
    { icon: <Facebook className="h-5 w-5" />, href: '#' },
    { icon: <Twitter className="h-5 w-5" />, href: '#' },
  ],
  quickLinks = [
    { label: 'Home', to: '/' },
    { label: 'Features', to: '' },
    { label: 'About Us', to: '/about' },
    { label: 'Contact Us', to: '/contact' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms of Service', to: '/terms' },
  ],
  services = [
    'Tasks & To-Dos',
    'Notes & Journals',
    'Calendar & Events',
    'Goals & Routines',
    'Time Tracking',
    'Personal Blogs',
    'Habit Tracking',
    'Collaboration Tools',
  ],
  contact = {
    address: 'Bhopal, Madhya Pradesh, India',
    phone: '9523666086',
    email: 'asifkhan.tech.2003@gmail.com',
    hours: '24/7 Customer Support',
  },
}) => {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h4 className="text-xl font-bold mb-6 flex items-center text-white">
              <Heart className="h-5 w-5 mr-2 text-blue-500" />
              {brand}
            </h4>
              <p className='m-4 ml-0'> © 2025 Asif Khan. All rights reserved.</p>
            <p className="text-gray-400 mb-6">{description}</p>
            <div className="flex space-x-4">
              {socials.map((s, i) => (
                <a key={i} href={s.href} className="text-gray-400 hover:text-blue-500 transition-colors">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-gray-400 hover:text-blue-500 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Services</h4>
            <ul className="space-y-3">
              {services.map((service, i) => (
                <li key={i}>
                  <Link to="#" className="text-gray-400 hover:text-blue-500 transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-bold mb-6 text-white">Contact Us</h4>
            <ul className="space-y-4">
               <li className="flex items-start">
                
                <span className="text-gray-400">© Asif Khan</span>
              </li>
              <li className="flex items-start">
                <MapPin className="h-5 w-5 mr-3 text-blue-500 shrink-0 mt-1" />
                <span className="text-gray-400">{contact.address}</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 mr-3 text-blue-500 shrink-0" />
                <a href={`tel:${contact.phone}`} className="text-gray-400 hover:text-blue-500 transition-colors">
                  {contact.phone}
                </a>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 mr-3 text-blue-500 shrink-0" />
                <a href={`mailto:${contact.email}`} className="text-gray-400 hover:text-blue-500 transition-colors">
                  {contact.email}
                </a>
              </li>
              <li className="flex items-center">
                <Clock className="h-5 w-5 mr-3 text-blue-500 shrink-0" />
                <span className="text-gray-400">{contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}

        {/* Newsletter */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-xl font-bold mb-4 text-white">Subscribe to Our Newsletter</h4>
            <p className="text-gray-400 mb-6">Stay updated with our latest services, offers, and tips.</p>
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your Email Address"
                className="px-4 py-3 rounded-md bg-gray-800 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-blue-500 flex-grow"
                required
              />
              <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-3 rounded-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} {brand}. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
