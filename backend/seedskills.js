const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");
const Skill = require("./models/Skill");

const skills = [
  {
    name: "C++",
    aliases: ["cpp"],
  },
  {
    name: "Java",
    aliases: [],
  },
  {
    name: "Python",
    aliases: ["python3"],
  },
  {
    name: "JavaScript",
    aliases: ["js", "javascript es6"],
  },
  {
    name: "TypeScript",
    aliases: ["ts"],
  },
  {
    name: "HTML",
    aliases: ["html5"],
  },
  {
    name: "CSS",
    aliases: ["css3"],
  },
  {
    name: "React",
    aliases: ["react.js", "reactjs"],
  },
  {
    name: "Node.js",
    aliases: ["node", "nodejs"],
  },
  {
    name: "Express",
    aliases: ["express.js"],
  },
  {
    name: "MongoDB",
    aliases: ["mongo"],
  },
  {
    name: "MySQL",
    aliases: ["mysql db"],
  },
  {
    name: "PostgreSQL",
    aliases: ["postgres", "postgresql db"],
  },
  {
    name: "SQL",
    aliases: [],
  },
  {
    name: "Git",
    aliases: [],
  },
  {
    name: "GitHub",
    aliases: [],
  },
  {
    name: "REST API",
    aliases: [
      "restful api",
      "rest apis",
    ],
  },
  {
    name: "Docker",
    aliases: [],
  },
  {
    name: "AWS",
    aliases: [
      "amazon web services",
      "ec2",
      "s3",
      "lambda",
      "rds",
    ],
  },
  {
    name: "Firebase",
    aliases: [],
  },
  {
    name: "Redis",
    aliases: [],
  },
  {
    name: "JWT",
    aliases: [
      "json web token",
    ],
  },
  {
    name: "Machine Learning",
    aliases: ["ml"],
  },
  {
    name: "Data Structures",
    aliases: ["dsa"],
  },
  {
    name: "Algorithms",
    aliases: [],
  },
  {
    name: "DBMS",
    aliases: [
      "database management system",
    ],
  },
  {
    name: "Operating Systems",
    aliases: ["os"],
  },
  {
    name: "Computer Networks",
    aliases: ["cn"],
  },
  {
    name: "OOPs",
    aliases: [
      "object oriented programming",
    ],
  },
  {
    name: "Tailwind CSS",
    aliases: ["tailwind"],
  },
  {
    name: "Bootstrap",
    aliases: [],
  },
  {
    name: "Redux",
    aliases: [],
  },
  {
    name: "Next.js",
    aliases: ["nextjs"],
  },
  {
    name: "Kubernetes",
    aliases: ["k8s"],
  },
  {
    name: "CI/CD",
    aliases: [
      "github actions",
      "continuous integration",
    ],
  },
  {
    name: "Apache Airflow",
    aliases: ["airflow"],
  },
  {
    name: "dbt",
    aliases: [
      "data build tool",
    ],
  },
  {
    name: "Linux",
    aliases: ["ubuntu"],
  },
  {
    name: "Pandas",
    aliases: [],
  },
  {
    name: "NumPy",
    aliases: [],
  },
  {
    name: "TensorFlow",
    aliases: ["tf"],
  },
  {
    name: "PyTorch",
    aliases: [],
  },
  {
    name: "OpenCV",
    aliases: [],
  },
  {
    name: "Flask",
    aliases: [],
  },
  {
    name: "Django",
    aliases: [],
  },
  {
    name: "GraphQL",
    aliases: [],
  },
  {
    name: "Socket.io",
    aliases: ["socketio"],
  },
  {
    name: "Vercel",
    aliases: [],
  },
  {
    name: "Render",
    aliases: [],
  },
  {
    name: "Netlify",
    aliases: [],
  },
  {
    name: "Figma",
    aliases: [],
  },
  {
    name: "Power BI",
    aliases: [],
  },
  {
    name: "Tableau",
    aliases: [],
  },
];

const seedSkills = async () => {
  try {
    await connectDB();

    await Skill.deleteMany();

    await Skill.insertMany(skills);

    console.log("Skills Inserted");

    process.exit();
  } catch (error) {
    console.log(error);

    process.exit(1);
  }
};

seedSkills();