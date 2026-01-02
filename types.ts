
export interface UserProfile {
  name: string;
  role: string;
  location: string;
  bio: string;
  socials: {
    discord: string;
    youtube: string;
    instagram: string;
    email: string;
  };
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
