import React, { useState } from 'react';

// Наши данные
const competenciesData = [
  {
    name: "Финансовый аналитик",
    mainSkills: ["Excel", "SQL", "VBA", "1С"],
    otherSkills: ["Power BI", "Python"],
  },
  {
    name: "Предприниматель",
    mainSkills: ["1C", "Excel", "Power BI"],
    otherSkills: [
      "Google Analytics",
      "Яндекс.Метрика",
      "Python",
      "SQL",
      "Tilda",
    ],
  },
  {
    name: "Продуктовый дизайнер",
    mainSkills: [
      "Figma",
      "Sketch",
      "Illustrator",
      "Photoshop",
      "Principle",
      "Tilda",
    ],
    otherSkills: ["Shopify", "Protopie", "Cinema 4D"],
  },
  {
    name: "Менеджер проекта",
    mainSkills: [
      "Visio",
      "1C",
      "Google Analytics",
      "Яндекс.Метрика",
      "Python",
      "SQL",
      "Tilda",
    ],
    otherSkills: ["Figma", "Sketch", "Shopify"],
  },
  {
    name: "Финансовый менеджер",
    mainSkills: ["1C", "Excel", "Power BI"],
    otherSkills: ["BPMN"],
  },
  {
    name: "Руководитель финансового департамента компании",
    mainSkills: ["Sketch", "Figma"],
    otherSkills: ["Shopify", "HQL"],
  },

  {
    name: "Продуктовый аналитик",
    mainSkills: [
      "Google Analytics",
      "Яндекс.Метрика",
      "SQL",
      "Power BI",
      "Python",
      "Excel",
    ],
    otherSkills: ["HQL", "Tableau", "R", "Machine learning"],
  },

  {
    name: "Руководитель финансового продукта",
    mainSkills: ["Visio"],
    otherSkills: ["Python"],
  },
  {
    name: "Менеджер по маркетингу",
    mainSkills: [
      "Google Analytics",
      "Яндекс.Метрика",
      "Google Ads",
      "Ahrefs",
      "Главред",
      "My Target",
    ],
    otherSkills: ["Tilda", "Photoshop", "Xenu", "Python"],
  },

  {
    name: "Менеджер по цифровой трансформации",
    mainSkills: [
      "Visio",
      "Google Analytics",
      "Яндекс.Метрика",
      "Python",
      "SQL",
      "Tilda",
    ],
    otherSkills: ["Figma", "Sketch", "Shopify"],
  },
];

const Competence = ({ id, onSelect, cx, cy }) => {
  const buttonStyle = {
    cursor: 'pointer',
    fill: 'lightblue',
    stroke: 'black',
    strokeWidth: 1,
  };

  const textStyle = {
    cursor: 'pointer',
    textAnchor: 'middle',
    fontSize: '12',
    dominantBaseline: 'central',
  };

  return (
    <g onClick={() => onSelect(id - 1)}>
      <circle cx={cx} cy={cy} r={20} style={buttonStyle} />
      <text x={cx} y={cy} style={textStyle}>{id}</text>
    </g>
  );
};

const Skill = ({ name, type }) => {
  const style = {
    color: type === 'main' ? 'orange' : 'purple',
  };

  return <div style={style}>{name}</div>;
};

const Diagram = ({ data }) => {
  const [selectedCompetenceIndex, setSelectedCompetenceIndex] = useState(null);

  const onSelectCompetence = (index) => {
    setSelectedCompetenceIndex(index);
  };

  const renderSkills = (competence) => {
    return (
      <>
        {competence.mainSkills.map((skill, index) => (
          <Skill key={`main-${index}`} name={skill} type="main" />
        ))}
        {competence.otherSkills.map((skill, index) => (
          <Skill key={`other-${index}`} name={skill} type="other" />
        ))}
      </>
    );
  };

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start' }}>
      <svg width="600" height="600">
        {data.map((item, index) => {
          // Расчет положения в круговом макете
          const angle = (index / data.length) * Math.PI * 2 - Math.PI / 2;
          const cx = 300 + 200 * Math.cos(angle);
          const cy = 300 + 200 * Math.sin(angle);
          return (
            <Competence
              key={index}
              id={index + 1} // так как id начинается с 1
              onSelect={onSelectCompetence}
              cx={cx}
              cy={cy}
            />
          );
        })}
        {selectedCompetenceIndex !== null && (
        <foreignObject x="250" y="200" width="160" height="300">
          <div xmlns="http://www.w3.org/1999/xhtml">
            {renderSkills(data[selectedCompetenceIndex])}
          </div>
        </foreignObject>
      )}
    </svg>
      <div style={{ marginLeft: '20px', padding: '10px' }}>
        {data.map((item, index) => (
          <div key={index}>{index + 1} - {item.name}</div>
        ))}
      </div>
    </div>
  );
};

export default function App() {
  return <Diagram data={competenciesData} />;
}
