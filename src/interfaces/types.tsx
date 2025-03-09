
export interface Photo {
  id: string;
  urls: {
    small: string;
    regular: string;
  };
  alt_description: string;
  title: string;
  keywords: string[]; // Add a keywords array for filtering
}



export interface SearchFormProps {
    onSearch: (searchTerm: string) => void;
}
  
export interface PhotoCardProps {
    photo: {
      id: string;
      urls: {
        small: string;
        regular: string;
      };
      alt_description: string;
    };
    // onView: (photoId: string) => void;
  }
  