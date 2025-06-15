import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import TeamMemberCard from '@/components/team/TeamMemberCard';
import { MOCK_TEAM_MEMBERS } from '@/lib/constants';
import { Users } from 'lucide-react';

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <MainHeader />
      <main className="flex-grow py-16 md:py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16 animate-fade-in">
            <Users className="mx-auto h-16 w-16 text-primary mb-4" />
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground">
              Meet Our <span className="text-primary">Expert Team</span>
            </h1>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              The driving force behind Solude's innovation and success. We are passionate professionals dedicated to delivering exceptional solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {MOCK_TEAM_MEMBERS.map((member, index) => (
              <div key={member.id} className="animate-slide-in-from-bottom" style={{ animationDelay: `${index * 100}ms` }}>
                <TeamMemberCard
                  name={member.name}
                  role={member.role}
                  expertise={member.expertise}
                  imageUrl={member.imageUrl}
                  dataAiHint={member.dataAiHint}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
