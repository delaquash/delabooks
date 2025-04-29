
export interface  ItemUser {
    caption: string;
    createdAt: string;
    _id: string;
    rating: number;
    image: string;
    title: string;
      user: {
        image: string;
        username: string;
        user: string;
  
    }
  }
  
  export interface Book {
    _id: string;
    caption: string;
    createdAt: string;
    image: string;
    title: string;
    description?: string;
    rating: number;  // Added this property
    user: {
      _id: string;
      image: string;
      username: string;
      user: string;
    };
  }
  