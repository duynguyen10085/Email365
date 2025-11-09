import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Globe,
  Zap,
  Shield,
  Sparkles,
  Mail,
  GraduationCap,
  Briefcase,
  BookOpen,
  Scale,
  Users,
  Bell,
  FileText,
  CheckCircle2,
  BarChart3,
  Lightbulb,
  MessageSquare,
  Send,
  ArrowRight,
  Star,
  Workflow,
  Clock,
  Lock,
  Cloud,
  ShieldCheck,
  Eye,
  UserCheck,
  Award,
  Smartphone,
  Settings,
  Zap as ZapIcon,
  Headphones,
} from 'lucide-react';
import { SiFacebook, SiX, SiLinkedin, SiGithub } from 'react-icons/si';
import { toast } from 'sonner';

export default function HomePage() {
  const navigate = useNavigate();
  const { login, loginStatus } = useInternetIdentity();
  const [demoSubject, setDemoSubject] = useState('');
  const [demoSender, setDemoSender] = useState('');
  const [demoContent, setDemoContent] = useState('');
  const [formError, setFormError] = useState('');
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState('hero');
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [faqSearch, setFaqSearch] = useState('');

  const isLoggingIn = loginStatus === 'logging-in';

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);

      const sections = ['hero', 'about', 'use-cases', 'features', 'faq', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      console.error('Login error:', error);
      if (error.message === 'User is already authenticated') {
        toast.error('Already logged in');
      }
    }
  };

  const handleDemoStart = () => {
    if (!demoSubject.trim() || !demoSender.trim() || !demoContent.trim()) {
      setFormError('Please fill in all fields');
      return;
    }
    setFormError('');
    navigate({ to: '/demo' });
  };

  const handleLanguageChange = (lang: string) => {
    toast.success(`Language changed to ${lang}`);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactName && contactEmail && contactMessage) {
      toast.success('Message sent! We\'ll get back to you soon.');
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }
  };

  const useCases = [
    {
      icon: GraduationCap,
      title: 'Students',
      description: 'Organize course emails, assignments, and campus notifications automatically.',
      image: '/assets/generated/student-use-case.dim_300x200.png',
    },
    {
      icon: Briefcase,
      title: 'Business Professionals',
      description: 'Separate invoices, contracts, and client communications effortlessly.',
      image: '/assets/generated/business-use-case.dim_300x200.png',
    },
    {
      icon: BookOpen,
      title: 'Educators',
      description: 'Manage student emails, parent communications, and administrative tasks.',
      image: '/assets/generated/educator-use-case.dim_300x200.png',
    },
    {
      icon: Scale,
      title: 'Legal Professionals',
      description: 'Keep case files, client correspondence, and court notices organized.',
      image: '/assets/generated/legal-use-case.dim_300x200.png',
    },
    {
      icon: Users,
      title: 'Recruiters',
      description: 'Track candidates, schedule interviews, and manage hiring pipelines.',
      image: '/assets/generated/recruiter-use-case.dim_300x200.png',
    },
    {
      icon: Headphones,
      title: 'Support Teams',
      description: 'Prioritize urgent tickets and track customer issues efficiently.',
      image: '/assets/generated/support-use-case.dim_300x200.png',
    },
  ];

  const faqData = [
    {
      q: 'How do I get started with Email365?',
      a: 'Simply sign in with Internet Identity, and Email365 will automatically start organizing your emails into smart categories. You can customize rules and categories in the Settings.',
    },
    {
      q: 'Do I need to connect my email account?',
      a: 'Currently, Email365 works as a demonstration of email sorting capabilities. Future versions will support direct email integration with Gmail, Outlook, and other major providers.',
    },
    {
      q: 'How do sorting rules work?',
      a: 'Sorting rules automatically categorize emails based on conditions you set (sender, subject, keywords, attachments). You can create, edit, and reorder rules in the Settings.',
    },
    {
      q: 'Can I create custom categories?',
      a: 'Yes! In addition to built-in categories like Priority and Finance, you can create unlimited custom categories with your own labels and colors.',
    },
    {
      q: 'Is my data secure?',
      a: 'Yes! Email365 runs on the Internet Computer blockchain, providing decentralized, tamper-proof storage. Your data is encrypted end-to-end and only accessible to you through your Internet Identity.',
    },
    {
      q: 'Who can see my emails?',
      a: 'Only you. Email365 uses Internet Identity for authentication, ensuring that your emails and settings are private and secure. We never access, read, or share your email content.',
    },
    {
      q: 'Why aren\'t my emails being sorted?',
      a: 'Check that your sorting rules are active and properly configured. Make sure the conditions match your email patterns. You can test rules in the Settings.',
    },
    {
      q: 'Is there a mobile app?',
      a: 'Email365 is a responsive web application that works seamlessly on mobile browsers. Native mobile apps for iOS and Android are planned for Q2 2025.',
    },
  ];

  const filteredFaqData = faqData.filter(
    item =>
      item.q.toLowerCase().includes(faqSearch.toLowerCase()) ||
      item.a.toLowerCase().includes(faqSearch.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-1 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <button
            onClick={() => scrollToSection('hero')}
            className="flex items-center gap-2 transition-opacity hover:opacity-80 min-w-0"
          >
            <img src="/assets/generated/logo-transparent.dim_200x200.png" alt="Email365 Logo" className="h-8 w-8 flex-shrink-0" />
            <span className="text-xl font-semibold truncate">Email365</span>
          </button>
          <nav className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleLanguageChange('English')}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('Spanish')}>Español</DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleLanguageChange('French')}>Français</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleLogin} disabled={isLoggingIn}>
              {isLoggingIn ? 'Signing in...' : 'Sign in'}
            </Button>
          </nav>
        </div>
      </header>

      {/* Anchor Navigation */}
      <nav className="sticky top-17 z-30 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-1 overflow-x-auto py-2 scrollbar-hide">
            {[
              { id: 'about', label: 'About' },
              { id: 'use-cases', label: 'Use Cases' },
              { id: 'features', label: 'Features' },
              { id: 'faq', label: 'FAQ' },
              { id: 'contact', label: 'Contact' },
            ].map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? 'secondary' : 'ghost'}
                size="sm"
                onClick={() => scrollToSection(item.id)}
                className="whitespace-nowrap flex-shrink-0"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="container mx-auto px-4 py-20 scroll-mt-32 overflow-x-hidden">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left: Value Proposition */}
          <div className="flex flex-col justify-center space-y-8 min-w-0">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit">
                <Sparkles className="mr-1 h-3 w-3" />
                AI-Powered Email Management
              </Badge>
              <h1 className="text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl break-words">
                Triage your inbox automatically
              </h1>
              <p className="text-xl text-muted-foreground">
                Let AI organize your emails into smart categories, so you can focus on what matters most.
              </p>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">Sort emails based on your categories</div>
                  <div className="text-sm text-muted-foreground">
                    Create custom rules or let AI learn your preferences
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                  <Bell className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">Never miss urgent messages</div>
                  <div className="text-sm text-muted-foreground">
                    Get instant push notifications for critical emails
                  </div>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-primary/10 p-1 flex-shrink-0">
                  <BarChart3 className="h-5 w-5 text-primary" />
                </div>
                <div className="min-w-0">
                  <div className="font-medium">Weekly insights and analytics</div>
                  <div className="text-sm text-muted-foreground">
                    Understand your email patterns with detailed reports
                  </div>
                </div>
              </li>
            </ul>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" onClick={() => navigate({ to: '/demo' })} className="gap-2">
                Try Demo <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={handleLogin} disabled={isLoggingIn}>
                {isLoggingIn ? 'Signing in...' : 'Get Started Free'}
              </Button>
            </div>
          </div>

          {/* Right: Demo Box */}
          <div className="flex items-center justify-center min-w-0">
            <Card className="w-full max-w-md shadow-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="truncate">Try the demo</span>
                </CardTitle>
                <CardDescription>Enter email details to see how Email365 works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="demo-subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Input
                    id="demo-subject"
                    type="text"
                    placeholder="Meeting tomorrow at 3pm"
                    value={demoSubject}
                    onChange={(e) => {
                      setDemoSubject(e.target.value);
                      setFormError('');
                    }}
                    className={formError ? 'border-destructive' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="demo-sender" className="text-sm font-medium">
                    Sender
                  </label>
                  <Input
                    id="demo-sender"
                    type="text"
                    placeholder="john@example.com"
                    value={demoSender}
                    onChange={(e) => {
                      setDemoSender(e.target.value);
                      setFormError('');
                    }}
                    className={formError ? 'border-destructive' : ''}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="demo-content" className="text-sm font-medium">
                    Mail content
                  </label>
                  <Textarea
                    id="demo-content"
                    placeholder="Hi, let's discuss the project details..."
                    value={demoContent}
                    onChange={(e) => {
                      setDemoContent(e.target.value);
                      setFormError('');
                    }}
                    className={formError ? 'border-destructive' : ''}
                    rows={4}
                  />
                </div>
                {formError && <p className="text-sm text-destructive">{formError}</p>}
                <Button onClick={handleDemoStart} className="w-full" size="lg">
                  Start demo
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* About Section - Simplified */}
      <section id="about" className="border-t border-border py-20 scroll-mt-32 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl break-words">
              Email management, simplified
            </h2>
            <p className="mb-8 text-xl leading-relaxed text-muted-foreground">
              Email365 uses artificial intelligence to automatically categorize your emails into smart categories. 
              Create custom sorting rules, get instant notifications for urgent messages, and gain insights into 
              your email patterns with weekly reports.
            </p>
            <p className="mb-12 text-lg text-muted-foreground">
              Built on the Internet Computer blockchain, your data is encrypted, secure, and completely private. 
              Save hours every week and focus on what truly matters.
            </p>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="rounded-lg border border-border bg-card p-6">
                <Clock className="mx-auto mb-3 h-10 w-10 text-primary" />
                <div className="mb-1 text-2xl font-bold">10+ hours</div>
                <div className="text-sm text-muted-foreground">Saved per week</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <Shield className="mx-auto mb-3 h-10 w-10 text-primary" />
                <div className="mb-1 text-2xl font-bold">100%</div>
                <div className="text-sm text-muted-foreground">Private & secure</div>
              </div>
              <div className="rounded-lg border border-border bg-card p-6">
                <Zap className="mx-auto mb-3 h-10 w-10 text-primary" />
                <div className="mb-1 text-2xl font-bold">Instant</div>
                <div className="text-sm text-muted-foreground">Auto-categorization</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section - Streamlined */}
      <section id="use-cases" className="border-t border-border bg-muted/30 py-20 scroll-mt-32 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl break-words">Who uses Email365?</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Professionals across industries trust Email365 to manage their inbox
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              return (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
                  <div className="aspect-video w-full overflow-hidden bg-muted">
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <div className="flex items-center gap-2 min-w-0">
                      <Icon className="h-5 w-5 text-primary flex-shrink-0" />
                      <CardTitle className="text-lg truncate">{useCase.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-4 text-sm text-muted-foreground">{useCase.description}</p>
                    <Button variant="ghost" size="sm" className="gap-2 px-0">
                      Learn more <ArrowRight className="h-3 w-3" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Feature Demo Section - Clean */}
      <section id="features" className="border-t border-border py-20 scroll-mt-32 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl break-words">Powerful features</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Everything you need to take control of your inbox
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <Mail className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Priority Categories</CardTitle>
                <CardDescription>
                  Automatically sort emails into custom categories
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Bell className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Emergency Notifications</CardTitle>
                <CardDescription>
                  Instant alerts for urgent messages
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <FileText className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Weekly Reports</CardTitle>
                <CardDescription>
                  Insights about your email patterns
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Workflow className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Smart Rule Builder</CardTitle>
                <CardDescription>
                  Create powerful automation rules
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <BarChart3 className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Advanced Search</CardTitle>
                <CardDescription>
                  Find any email instantly with filters
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <Shield className="mb-2 h-8 w-8 text-primary" />
                <CardTitle>Blockchain Security</CardTitle>
                <CardDescription>
                  Your data is encrypted and private
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section - Focused */}
      <section id="faq" className="border-t border-border bg-muted/30 py-20 scroll-mt-32 overflow-x-hidden">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl break-words">Frequently Asked Questions</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Find answers to common questions about Email365
            </p>
          </div>

          <div className="mb-8">
            <Input
              placeholder="Search questions..."
              value={faqSearch}
              onChange={(e) => setFaqSearch(e.target.value)}
            />
          </div>

          {filteredFaqData.length > 0 ? (
            <Accordion type="single" collapsible className="space-y-2">
              {filteredFaqData.map((item, idx) => (
                <AccordionItem
                  key={idx}
                  value={`${idx}`}
                  className="rounded-lg border border-border bg-card px-4"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <div className="rounded-lg border border-border bg-card p-8 text-center">
              <p className="text-lg font-medium">No results found</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setFaqSearch('')}
              >
                Clear search
              </Button>
            </div>
          )}

          <div className="mt-12 text-center">
            <p className="mb-4 text-muted-foreground">Still have questions?</p>
            <Button onClick={() => navigate({ to: '/help' })}>
              Visit Help Center
            </Button>
          </div>
        </div>
      </section>

      {/* Security Section - Simple */}
      <section className="border-t border-border py-20 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <Shield className="mx-auto mb-4 h-12 w-12 text-primary" />
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl break-words">Security & Privacy</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Your data is protected by blockchain technology and end-to-end encryption
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
            <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
              <Lock className="h-6 w-6 flex-shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="mb-1 font-semibold">End-to-End Encryption</div>
                <p className="text-sm text-muted-foreground">
                  All data encrypted with AES-256 before leaving your device
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
              <Cloud className="h-6 w-6 flex-shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="mb-1 font-semibold">Decentralized Storage</div>
                <p className="text-sm text-muted-foreground">
                  Data stored on blockchain, not centralized servers
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
              <Eye className="h-6 w-6 flex-shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="mb-1 font-semibold">Zero Knowledge</div>
                <p className="text-sm text-muted-foreground">
                  We can't see your emails, even if we wanted to
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
              <ShieldCheck className="h-6 w-6 flex-shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="mb-1 font-semibold">GDPR Compliant</div>
                <p className="text-sm text-muted-foreground">
                  Fully compliant with international privacy regulations
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
              <UserCheck className="h-6 w-6 flex-shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="mb-1 font-semibold">No Third-Party Access</div>
                <p className="text-sm text-muted-foreground">
                  We never share your data with advertisers or brokers
                </p>
              </div>
            </div>

            <div className="flex gap-4 rounded-lg border border-border bg-card p-6">
              <Award className="h-6 w-6 flex-shrink-0 text-primary" />
              <div className="min-w-0">
                <div className="mb-1 font-semibold">Regular Security Audits</div>
                <p className="text-sm text-muted-foreground">
                  Third-party audits ensure your data stays safe
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section - Clean */}
      <section className="border-t border-border bg-muted/30 py-20 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl break-words">Integrations</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Connect with your favorite tools and services
            </p>
          </div>

          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader>
                <Mail className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">Email Providers</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Gmail, Outlook, Yahoo Mail
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Smartphone className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">Mobile Apps</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                iOS, Android, Desktop
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Settings className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">Productivity</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                Slack, Trello, Notion
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ZapIcon className="mb-2 h-8 w-8 text-primary" />
                <CardTitle className="text-base">API Access</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                REST API, Webhooks, SDK
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Streamlined */}
      <section className="border-t border-border py-20 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl break-words">What users say</h2>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Join thousands of satisfied users
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-4 min-w-0">
                  <img
                    src="/assets/generated/testimonial-woman-1.dim_100x100.png"
                    alt="Sarah K."
                    className="h-12 w-12 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">Sarah K.</div>
                    <div className="text-sm text-muted-foreground truncate">Marketing Manager</div>
                  </div>
                </div>
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm italic text-muted-foreground">
                  "Email365 has completely transformed how I manage my inbox. I save 10+ hours per week!"
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-4 min-w-0">
                  <img
                    src="/assets/generated/testimonial-man-1.dim_100x100.png"
                    alt="Michael T."
                    className="h-12 w-12 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">Michael T.</div>
                    <div className="text-sm text-muted-foreground truncate">Software Engineer</div>
                  </div>
                </div>
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm italic text-muted-foreground">
                  "The rule builder is genius! I've automated my entire email workflow. Best tool I've ever used."
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="mb-4 flex items-center gap-4 min-w-0">
                  <img
                    src="/assets/generated/testimonial-person-2.dim_100x100.png"
                    alt="Jennifer L."
                    className="h-12 w-12 rounded-full flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="font-medium truncate">Jennifer L.</div>
                    <div className="text-sm text-muted-foreground truncate">Attorney</div>
                  </div>
                </div>
                <div className="mb-3 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm italic text-muted-foreground">
                  "Perfect for managing multiple cases. Emergency notifications ensure I never miss urgent matters."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section - Simple */}
      <section id="contact" className="border-t border-border bg-muted/30 py-20 scroll-mt-32 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl break-words">
                Ready to organize your inbox?
              </h2>
              <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                Start using Email365 today. No credit card required.
              </p>
            </div>

            <div className="mb-12 flex flex-wrap items-center justify-center gap-4">
              <Button size="lg" onClick={handleLogin} disabled={isLoggingIn} className="gap-2">
                {isLoggingIn ? 'Signing in...' : 'Get Started Free'} <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate({ to: '/demo' })}>
                Try Demo
              </Button>
            </div>

            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary flex-shrink-0" />
                  <span className="truncate">Get in touch</span>
                </CardTitle>
                <CardDescription>
                  Have questions? Send us a message and we'll respond soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="contact-name" className="text-sm font-medium">
                        Name
                      </label>
                      <Input
                        id="contact-name"
                        type="text"
                        placeholder="Your name"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="contact-email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        placeholder="your@email.com"
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="contact-message"
                      placeholder="Tell us how we can help..."
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      required
                      rows={5}
                    />
                  </div>
                  <Button type="submit" className="w-full gap-2">
                    Send Message <Send className="h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 overflow-x-hidden">
        <div className="container mx-auto px-4">
          <div className="mb-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="mb-4 flex items-center gap-2 min-w-0">
                <img src="/assets/generated/logo-transparent.dim_200x200.png" alt="Email365 Logo" className="h-8 w-8 flex-shrink-0" />
                <span className="text-xl font-semibold truncate">Email365</span>
              </div>
              <p className="mb-4 text-sm text-muted-foreground">
                Intelligent email organization powered by blockchain technology.
              </p>
              <div className="flex gap-3">
                <Button variant="ghost" size="icon" onClick={() => toast.info('Follow us on X')}>
                  <SiX className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => toast.info('Follow us on LinkedIn')}>
                  <SiLinkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => toast.info('Follow us on Facebook')}>
                  <SiFacebook className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => toast.info('Star us on GitHub')}>
                  <SiGithub className="h-5 w-5" />
                </Button>
              </div>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection('features')} className="hover:text-foreground">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('use-cases')} className="hover:text-foreground">
                    Use Cases
                  </button>
                </li>
                <li>
                  <button onClick={() => navigate({ to: '/demo' })} className="hover:text-foreground">
                    Demo
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => navigate({ to: '/help' })} className="hover:text-foreground">
                    Help Center
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('faq')} className="hover:text-foreground">
                    FAQ
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="mb-4 font-semibold">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection('about')} className="hover:text-foreground">
                    About
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('contact')} className="hover:text-foreground">
                    Contact
                  </button>
                </li>
                <li>
                  <button onClick={() => toast.info('Privacy Policy')} className="hover:text-foreground">
                    Privacy
                  </button>
                </li>
                <li>
                  <button onClick={() => toast.info('Terms of Service')} className="hover:text-foreground">
                    Terms
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-border pt-8 text-center">
            <p className="text-sm text-muted-foreground">
              © 2025. Built with <span className="text-primary">♥</span> using{' '}
              <a
                href="https://caffeine.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-foreground"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
