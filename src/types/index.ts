export interface User {
  Id: number,
  UserName: string,
  Name: string,
  Email: string,
  Phone: string,
  Password: string,
  Tz: string,
  }
  
  export interface Instructions{
    Id: number,
    Name: string
}

export interface Ingridents{
  Id: number;
  Name: string;
  Count: string;
  Type: string;
};

export interface Category {
  Id: number;
  Name: string;
  createdAt: Date;
  updatedAt: Date;
};

  export interface Recipe {
    Id: number,
    Name: string,
    UserId: number,
    Categoryid: number
    Img: string,
    Duration: number,
    Difficulty: number,
    Description: string,
    Ingridents: Ingridents[],
    Instructions: Instructions[],
  }

  //  Name, UserId, CategoryId, Img, Duration, Difficulty, Description,
  // Ingridents, Instructions

   
  