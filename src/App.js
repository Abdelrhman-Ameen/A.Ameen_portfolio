import React, { useState, useEffect, useRef } from 'react';

import {
Chart as ChartJS,
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
ArcElement,
RadialLinearScale,
Title,
Tooltip,
Legend,
Filler
} from 'chart.js';

import { Bar, Line, Pie, Radar } from 'react-chartjs-2';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Register Chart.js components
ChartJS.register(
CategoryScale,
LinearScale,
BarElement,
LineElement,
PointElement,
ArcElement,
RadialLinearScale,
Title,
Tooltip,
Legend,
Filler
);

// Name Typing Animation Component
const NameTypingAnimation = () => {
  const firstName = "Abdelrhman";
  const lastName = " Ameen";

  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  const typingSpeed = 150; // ms per character
  const deletingSpeed = 100;
  const pauseAfterTyping = 1000; // Pause after typing last name

  useEffect(() => {
    let timer;

    // Cursor blink effect
    const cursorTimer = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    if (!isDeleting) {
      // Typing logic
      if (displayedText.length < firstName.length) {
        timer = setTimeout(() => {
          setDisplayedText(firstName.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else if (displayedText.length < firstName.length + lastName.length) {
        timer = setTimeout(() => {
          setDisplayedText(firstName + lastName.substring(0, displayedText.length - firstName.length + 1));
        }, typingSpeed);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseAfterTyping);
      }
    } else {
      // Deleting logic
      if (displayedText.length > firstName.length) {
        timer = setTimeout(() => {
          setDisplayedText(displayedText.substring(0, displayedText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
      }
    }

    return () => {
      clearTimeout(timer);
      clearInterval(cursorTimer);
    };
  }, [displayedText, isDeleting]);

  return (
    <span style={{ fontFamily: "'Fira Code', monospace", color: '#00ff41' }}>
      {displayedText}
      <span style={{ visibility: cursorVisible ? 'visible' : 'hidden' }}>|</span>
    </span>
  );
};

const AbdelrhmanPortfolio = () => {
const [activeSection, setActiveSection] = useState('home');
const [isLoading, setIsLoading] = useState(true);
const [terminalText, setTerminalText] = useState('');

// Chart refs للتأكد من تنظيف الـcharts
const chartRefs = useRef({});

useEffect(() => {
setTimeout(() => setIsLoading(false), 2000);
}, []);

// Terminal animation effect
useEffect(() => {
const commands = [
'> git clone https://github.com/Abdelrhman-Ameen/portfolio.git',
'> cd portfolio',
'> npm install',
'> npm start',
'> Building optimized portfolio...',
'> Hello, I am Abdelrhman Ameen :)'
];

let currentIndex = 0;

const typeCommand = () => {
if (currentIndex < commands.length) {
setTerminalText(commands.slice(0, currentIndex + 1).join('\n'));
currentIndex++;
setTimeout(typeCommand, 1000);
}
};

if (!isLoading) {
setTimeout(typeCommand, 1000);
}
}, [isLoading]);

// تنظيف الcharts
useEffect(() => {
return () => {
Object.values(chartRefs.current).forEach(chartRef => {
if (chartRef?.current) {
chartRef.current.destroy();
}
});
};
}, []);
const skillsRadarData = {
labels: ['MySQL', 'Machine Learning', 'Power BI', 'NLP', 'Python', 'Data Analysis'],
datasets: [{
label: 'Skill Level (%)',
data: [55, 43, 65, 53, 80, 55],
backgroundColor: function(context) {
    const chart = context.chart;
    const {ctx, chartArea} = chart;
    if (!chartArea) {
      return 'rgba(0, 255, 0, 0.2)';
    }
    
    const centerX = (chartArea.left + chartArea.right) / 2;
    const centerY = (chartArea.top + chartArea.bottom) / 2;
    const radius = Math.min(chartArea.right - chartArea.left, chartArea.bottom - chartArea.top) / 2;
    
    // تدرج دائري من المركز للخارج
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
    gradient.addColorStop(0, 'rgba(255, 0, 0, 0.4)');     // أحمر في المركز
    gradient.addColorStop(0.2, 'rgba(255, 0, 0, 0.2)');   // أحمر أفتح
    gradient.addColorStop(0.4, 'rgba(0, 255, 0, 0.2)');   // أخضر فاتح
    gradient.addColorStop(1, 'rgba(0, 255, 0, 0.4)');     // أخضر قوي على الأطراف
    
    return gradient;
  },
  
borderColor: '#00ff41',
borderWidth: 3,
fill: true,

}]
};

// Updated accuracy vs speed data for homepage - Performance Overview
const accuracySpeedData = {
  labels: ['40', '80', '120', '160', '180', '220', '260', '280', '300'],
  datasets: [
    {
      label: 'Code Efficiency',
      data: [69.8, 72, 76, 80, 83, 85, 87, 88, 89],
      borderColor: '#00ff41',
      backgroundColor: 'rgba(0, 255, 65, 0.1)',
      fill: true,
      tension: 0.6,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 2,
      yAxisID: 'y'
    },
    {
      label: 'Time Spent Debugging',
      data: [91, 90, 87.5, 84.5, 81, 78, 76, 74, 73],
      borderColor: '#ff1744',
      backgroundColor: 'rgba(255, 23, 68, 0.1)',
      fill: true,
      tension: 0.6,
      pointRadius: 0,
      pointHoverRadius: 0,
      borderWidth: 2,
      yAxisID: 'y'
    }
  ]
};




// **محسن** Experience Timeline Data (بالتواريخ والفترات الصحيحة)
const experienceTimelineData = {
labels: ['Feb 2025', 'Jun 2025', 'Jul 2025', 'Sep 2025', 'Present'],
datasets: [
{
label: 'GDG-NU AI Intern (Feb - Jul 2025)',
data: [1, 1, 1, null, null],
backgroundColor: '#8B5CF6',
borderColor: '#8B5CF6',
borderWidth: 4,
stepped: true,
fill: false,
pointRadius: 0
},
{
label: 'DEPI Data Analysis Intern (Jun 2025 - Present)',
data: [null, 2, 2, 2, 2],
backgroundColor: '#3B82F6',
borderColor: '#3B82F6',
borderWidth: 4,
stepped: true,
fill: false,
pointRadius: 0
},
{
label: 'Aligner AI Audio Training (Jul 2025 - Present)',
data: [null, null, 3, 3, 3],
backgroundColor: '#F59E0B',
borderColor: '#F59E0B',
borderWidth: 4,
stepped: true,
fill: false,
pointRadius: 0
},
{
label: 'Nile University Junior TA (Sep 2025 - Present)',
data: [null, null, null, 4, 4],
backgroundColor: '#10B981',
borderColor: '#10B981',
borderWidth: 4,
stepped: true,
fill: false,
pointRadius: 0
}
]
};

// Updated experience distribution data
const experienceData = {
labels: ['Teaching', 'Development', 'Data Analysis', 'AI Training', 'Academic'],
datasets: [{
data: [20, 30, 25, 15, 10],
backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
borderWidth: 0
}]
};

const projectTimelineData = {
labels: ['2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4'],
datasets: [{
label: 'Projects Completed',
data: [2, 1, 1, 1, 1],
backgroundColor: '#36A2EB'
}, {
label: 'Technologies Learned',
data: [3, 4, 3, 5, 4],
backgroundColor: '#FF6384'
}]
};

// Programming commits simulation
const programmingCommitsData = {
labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
datasets: [{
label: 'Git Commits',
data: [45, 52, 38, 67, 71, 59, 83, 91, 74],
borderColor: '#00ff41',
backgroundColor: 'rgba(0, 255, 65, 0.1)',
fill: true,
tension: 0.4
}]
};

// Code Examples
const textAnalysisCode = `#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
@author: Abdelrhman Ameen
@project: Interactive Text Analysis Tool
@version: 2.1.0
@license: MIT
"""

import streamlit as st
import nltk
import pandas as pd
import numpy as np
from textblob import TextBlob
import textstat
from transformers import T5Tokenizer, T5ForConditionalGeneration
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class TextAnalyzer:
"""Advanced NLP Text Analysis Engine"""

def __init__(self):
self.paraphrase_model = T5ForConditionalGeneration.from_pretrained('t5-base')
self.paraphrase_tokenizer = T5Tokenizer.from_pretrained('t5-base')
logger.info("TextAnalyzer initialized successfully")

def analyze_sentiment(self, text: str) -> dict:
"""Perform sentiment analysis on input text"""
try:
blob = TextBlob(text)
sentiment = blob.sentiment
return {
'polarity': round(sentiment.polarity, 3),
'subjectivity': round(sentiment.subjectivity, 3),
'label': self._classify_sentiment(sentiment.polarity),
'confidence': abs(sentiment.polarity)
}
except Exception as e:
logger.error(f"Sentiment analysis failed: {e}")
return None

def _classify_sentiment(self, polarity: float) -> str:
"""Classify sentiment based on polarity score"""
if polarity > 0.1:
return 'Positive'
elif polarity < -0.1:
return 'Negative'
else:
return 'Neutral'

if __name__ == "__main__":
analyzer = TextAnalyzer()
print("Text Analyzer ready!")`;

const salesDashboardCode = `# Sales Data Visualization Dashboard
# Author: Abdelrhman Ameen
# Tech Stack: Python, Matplotlib, Pandas, NumPy

import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
import seaborn as sns
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# Set style for professional look
plt.style.use('dark_background')
sns.set_palette("husl")

class SalesDashboard:
"""Professional Sales Analytics Dashboard"""

def __init__(self, data_source='synthetic'):
self.data_source = data_source
self.data = self.generate_synthetic_data()
self.colors = {
'primary': '#00ff41',
'secondary': '#0066cc',
'accent': '#ff6b35',
'background': '#1a1a1a'
}
print("[INFO] Dashboard initialized successfully")

def generate_synthetic_data(self):
"""Generate realistic sales data for demonstration"""
np.random.seed(42)
# Time series data
months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
# Generate revenue data
monthly_revenue = []
for i, month in enumerate(months):
base_revenue = 50000
revenue = np.random.normal(base_revenue, 10000)
monthly_revenue.append(max(revenue, 0))

return {
'months': months,
'monthly_revenue': monthly_revenue
}

def create_dashboard(self):
"""Create comprehensive sales dashboard"""
fig = plt.figure(figsize=(16, 10))
fig.suptitle('Sales Analytics Dashboard',
fontsize=16, color=self.colors['primary'], weight='bold')

# Revenue trend
ax1 = plt.subplot(2, 2, 1)
ax1.plot(self.data['months'], self.data['monthly_revenue'],
marker='o', linewidth=3, markersize=8,
color=self.colors['primary'])
ax1.set_title('Monthly Revenue Trend', fontsize=14, weight='bold')
ax1.set_ylabel('Revenue (USD)', fontsize=12)
ax1.grid(True, alpha=0.3)

plt.tight_layout()
return fig

# Usage example
if __name__ == "__main__":
dashboard = SalesDashboard()
fig = dashboard.create_dashboard()
plt.show()`;

const busReservationCode = `/**
* @file BusReservationSystem.cpp
* @author Abdelrhman Ameen
* @brief Advanced Bus Reservation Management System
* @version 2.0.0
*/

#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>

namespace BusReservation {
const std::string VERSION = "2.0.0";
const std::string AUTHOR = "Abdelrhman Ameen";

enum class SeatStatus {
AVAILABLE,
RESERVED,
OCCUPIED
};

struct Route {
std::string routeId;
std::string source;
std::string destination;
double basePrice;
int totalSeats;
std::vector<SeatStatus> seatAvailability;

Route(const std::string& id, const std::string& src,
const std::string& dest, double price, int seats)
: routeId(id), source(src), destination(dest),
basePrice(price), totalSeats(seats) {
seatAvailability.resize(seats, SeatStatus::AVAILABLE);
}

int getAvailableSeats() const {
return std::count(seatAvailability.begin(),
seatAvailability.end(), SeatStatus::AVAILABLE);
}
};

class BusReservationSystem {
private:
std::map<std::string, Route> routes;

public:
BusReservationSystem() {
initializeRoutes();
std::cout << "Bus Reservation System v" << VERSION
<< " initialized" << std::endl;
}

void initializeRoutes() {
Route route1("R001", "Cairo", "Alexandria", 150.0, 40);
routes["R001"] = route1;
std::cout << "Routes initialized successfully" << std::endl;
}

std::string reserveSeat(const std::string& userId,
const std::string& routeId) {
auto it = routes.find(routeId);
if (it == routes.end()) {
return "ERROR: Route not found";
}

Route& route = it->second;
for (int i = 0; i < route.totalSeats; i++) {
if (route.seatAvailability[i] == SeatStatus::AVAILABLE) {
route.seatAvailability[i] = SeatStatus::RESERVED;
return "RES" + std::to_string(i + 1);
}
}
return "ERROR: No seats available";
}
};
}

int main() {
BusReservation::BusReservationSystem system;
auto res1 = system.reserveSeat("U001", "R001");
std::cout << "Reservation: " << res1 << std::endl;
return 0;
}`;

// Enhanced Chart Options - Performance Overview
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      labels: {
        color: '#e0e0e0',
        font: {
          family: "'Fira Code', monospace"
        }
      }
    },
    tooltip: {
      callbacks: {
        label: function(context) {
          if (context.dataset.label === 'Code Efficiency') {
            return `${context.dataset.label}: ${context.parsed.y}%`;
          } else {
            return `${context.dataset.label}: ${context.parsed.y} mins`;
          }
        }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Problems Solved (Problem Solving)',
        color: '#e0e0e0',
        font: {
          family: "'Fira Code', monospace",
          size: 12
        }
      },
      ticks: {
        color: '#e0e0e0',
        font: {
          family: "'Fira Code', monospace"
        }
      },
      grid: { color: 'rgba(255,255,255,0.1)' }
    },
    y: {
      min: 60,                    // حد أدنى ثابت
      max: 100,                   // حد أقصى ثابت
      ticks: {
        color: '#e0e0e0',
        font: {
          family: "'Fira Code', monospace"
        }
      },
      grid: { 
        color: 'rgba(255,255,255,0.1)' 
      },
      title: {
        display: false,
        text: 'Performance (%)',
        color: '#e0e0e0',
        font: {
          family: "'Fira Code', monospace",
          size: 12
        }
      }
    }
  }
};

// Enhanced radar options للسكيلز
const radarOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
position: 'top',
labels: {
color: '#e0e0e0',
font: {
size: 14,
family: "'Fira Code', monospace"
}
}
}
},
scales: {
r: {
min: 0,
max: 100,
ticks: {
stepSize: 20,
color: '#e0e0e0',
backdropColor: 'transparent',
font: {
family: "'Fira Code', monospace"
}
},
grid: {
color: 'rgba(0, 255, 65, 0.2)'
},
pointLabels: {
color: '#00ff41',
font: {
size: 12,
weight: 'bold',
family: "'Fira Code', monospace"
}
}
}
}
};

// **محسن** Experience Timeline Options (بالتواريخ)
const experienceTimelineOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
position: 'bottom',
labels: {
color: '#e0e0e0',
font: {
size: 11,
family: "'Fira Code', monospace"
},
usePointStyle: true,
padding: 15
}
},
tooltip: {
backgroundColor: 'rgba(0, 0, 0, 0.9)',
titleColor: '#00ff41',
bodyColor: '#e0e0e0',
borderColor: '#00ff41',
borderWidth: 1,
titleFont: {
family: "'Fira Code', monospace"
},
bodyFont: {
family: "'Fira Code', monospace"
},
filter: function(tooltipItem) {
return tooltipItem.parsed.y !== null;
}
}
},
scales: {
x: {
title: {
display: true,
text: 'Timeline (2025)',
color: '#00ff41',
font: {
size: 14,
weight: 'bold',
family: "'Fira Code', monospace"
}
},
ticks: {
color: '#00ff41',
font: {
size: 11,
family: "'Fira Code', monospace"
}
},
grid: {
color: 'rgba(0, 255, 65, 0.1)'
}
},
y: {
min: 0,
max: 5,
ticks: {
display: false
},
grid: {
display: false
}
}
},
elements: {
line: {
tension: 0
}
}
};

const pieOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
position: 'right',
labels: {
color: '#e0e0e0',
padding: 20,
font: {
family: "'Fira Code', monospace"
}
}
}
}
};

// Git commits chart options
const commitsChartOptions = {
responsive: true,
maintainAspectRatio: false,
plugins: {
legend: {
labels: {
color: '#e0e0e0',
font: {
family: "'Fira Code', monospace"
}
}
}
},
scales: {
x: {
ticks: {
color: '#e0e0e0',
font: {
family: "'Fira Code', monospace"
}
},
grid: { color: 'rgba(255,255,255,0.1)' }
},
y: {
ticks: {
color: '#e0e0e0',
font: {
family: "'Fira Code', monospace"
}
},
grid: { color: 'rgba(255,255,255,0.1)' },
title: {
display: true,
text: 'git commits',
color: '#00ff41',
font: {
family: "'Fira Code', monospace"
}
}
}
}
};

if (isLoading) {
return (
<div style={styles.loader}>
<div style={styles.loaderContent}>
<div style={styles.dataStream}>
<div>{"> chmod +x portfolio_init.sh"}</div>
<div>{"> ./portfolio_init.sh"}</div>
<div>{"> Loading React components..."}</div>
<div>{"> Compiling TypeScript modules..."}</div>
<div>{"> Initializing chart.js libraries..."}</div>
<div>{"> Building production bundle..."}</div>
<div>{"> ✓ Portfolio compiled successfully!"}</div>
</div>
</div>
</div>
);
}

return (
<div style={styles.container}>
{/* Navigation */}
<nav style={styles.nav}>
<div style={styles.navBrand}>
<div style={styles.logo}>{'<AA/>'}</div>
<div style={styles.brandText}>~/abdelrhman-portfolio$</div>
</div>
<div style={styles.navLinks}>
{['home', 'about', 'projects', 'skills', 'services', 'experience', 'contact'].map(section => (
<button
key={section}
style={{
...styles.navLink,
...(activeSection === section ? styles.navLinkActive : {})
}}
onClick={() => setActiveSection(section)}
>
<span style={styles.navLinkPrefix}> <span style={styles.navLinkPrefix}>{`<`}</span></span>
{section}
<span style={styles.navLinkSuffix}><span style={styles.navLinkPrefix}>{`>`}</span></span>
</button>
))}
</div>
</nav>

{/* Main Content */}
<main style={styles.main}>
<div style={styles.section}>

{/* Home Section */}
{activeSection === 'home' && (
<div>


<div style={styles.hero}>
<div style={styles.heroContent}>
<div style={styles.heroTitle}>
<NameTypingAnimation />
</div>
<div style={styles.codeComment}>
<span style={styles.commentSymbol}>//</span> Computer Science Student & Data Scientist
</div>

<div style={styles.uspContainer}>
<div style={styles.codeComment}>
</div>
<div style={styles.heroDescription}>
Computer Science student with a 3.93 GPA,
</div>
<div style={styles.heroDescription}>
strong problem-solving skills demonstrated by solving over 300+ algorithms —
</div>
<div style={styles.heroDescription}>
including Data Structures challenges — on platforms such as Vjudge, Codeforces, and LeetCode.
</div>
<div style={styles.heroDescription}>
Currently training AI models for audio recognition using Python,
</div>
<div style={styles.heroDescription}>
and serving as a Junior Teaching Assistant in Python.
</div>
<div style={styles.codeComment}>
</div>
</div>

<div style={styles.personalSlogan}>
<span style={styles.stringDelimiter}>"</span>
Turning complex algorithms into elegant solutions — let's code something extraordinary.
<span style={styles.stringDelimiter}>"</span>
</div>

<div style={styles.heroStats}>
<div style={styles.stat}>
<div style={styles.statValue}>3.93</div>
<div style={styles.statLabel}>GPA</div>
</div>
<div style={styles.stat}>
<div style={styles.statValue}>5+</div>
<div style={styles.statLabel}>Projects</div>
</div>
<div style={styles.stat}>
<div style={styles.statValue}>4</div>
<div style={styles.statLabel}>Experiences</div>
</div>
<div style={styles.stat}>
<div style={styles.statValue}>300+</div>
<div style={styles.statLabel}>Problems Solved</div>
</div>
</div>

{/* Terminal Display */}
<div style={styles.terminalContainer}>
<div style={styles.terminalHeader}>
<div style={{...styles.terminalButton, backgroundColor: '#ff5f56'}}></div>
<div style={{...styles.terminalButton, backgroundColor: '#ffbd2e'}}></div>
<div style={{...styles.terminalButton, backgroundColor: '#27ca3f'}}></div>
<div style={styles.terminalTitle}>abdelrhman@portfolio</div>
</div>
<div style={styles.terminalBody}>
<pre style={styles.terminalText}>{terminalText}</pre>
</div>
</div>
</div>

<div style={styles.heroChart}>

<div style={styles.chartContainer}>
<Line data={accuracySpeedData} options={chartOptions} />
</div>
</div>
</div>
</div>
)}
{/* About Section - Completely Redesigned */}
{activeSection === 'about' && (
  <div style={styles.aboutSection}>
    {/* Header with animated typing */}
    <div style={styles.aboutHeader}>
      <div style={styles.aboutTitleContainer}>
        
        <span style={styles.aboutTitle}>About Me</span>
        <span style={styles.commentSuffix}>{`</>`}</span>
      </div>
    </div>

    {/* Main Content Grid */}
    <div style={styles.aboutMainGrid}>
      
      {/* Left Side - Profile & Info */}
      <div style={styles.aboutLeftColumn}>
        
        {/* Profile Card */}
        <div style={styles.profileCard}>
          <div style={styles.cardHeader}>
            
            <span style={styles.cardTitle}>profile.json</span>
          </div>
          <div style={styles.profileContent}>
            <div style={styles.profileAvatar}>
              <img 
               <img src={`${process.env.PUBLIC_URL}/ME.jpg`} alt="Me" />
                alt="Abdelrhman Ameen" 
                style={{
                  width: '120px',
                  height: '120px',
                  borderRadius: '50%',
                  border: '3px solid #00ff41',
                  objectFit: 'cover',
                  boxShadow: '0 0 30px rgba(0, 255, 65, 0.3)',
                  transition: 'all 0.3s ease'
                }}
              />
              <div style={styles.statusIndicator}></div>
            </div>
            <div style={styles.profileInfo}>
              <div style={styles.profileName}><span style={styles.bracket}>{'{'}</span>Abdelrhman Ameen<span style={styles.bracket}>{'}'}</span></div>
              <div style={styles.profileRole}>
                <span style={styles.rolePrefix}>$</span> Computer Science Student & JTA
              </div>
              <div style={styles.profileLocation}>
               Nile University, Egypt
              </div>
            </div>
          </div>
          
          {/* Stats */}
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <div style={styles.statValue}>3.93</div>
              <div style={styles.statLabel}>CGPA</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>2028</div>
              <div style={styles.statLabel}>Expected Graduation</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>4+</div>
              <div style={styles.statLabel}>Projects</div>
            </div>
            <div style={styles.statItem}>
              <div style={styles.statValue}>300+</div>
              <div style={styles.statLabel}>Problems</div>
            </div>
          </div>
        </div>

        {/* Code Block */}
        <div style={styles.codeCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}>⚡</span>
            <span style={styles.cardTitle}>about.py</span>
          </div>
          <div style={styles.codeContent}>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>01</span>
              <span style={styles.keyword}>class</span>
              <span style={styles.className}> Developer</span>
              <span style={styles.bracket}>:</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>02</span>
              <span style={styles.indent}>    </span>
              <span style={styles.keyword}>def</span>
              <span style={styles.functionName}> __init__</span>
              <span style={styles.bracket}>(self):</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>03</span>
              <span style={styles.indent}>        </span>
              <span style={styles.property}>self.name</span>
              <span style={styles.operator}> = </span>
              <span style={styles.string}>"Abdelerhman Ameen"</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>04</span>
              <span style={styles.indent}>        </span>
              <span style={styles.property}>self.role</span>
              <span style={styles.operator}> = </span>
              <span style={styles.string}>"CS Student & JTA"</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>05</span>
              <span style={styles.indent}>        </span>
              <span style={styles.property}>self.university</span>
              <span style={styles.operator}> = </span>
              <span style={styles.string}>"Nile University"</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>06</span>
              <span style={styles.indent}>        </span>
              <span style={styles.property}>self.gpa</span>
              <span style={styles.operator}> = </span>
              <span style={styles.number}>3.93</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>07</span>
              <span style={styles.indent}>        </span>
              <span style={styles.property}>self.skills</span>
              <span style={styles.operator}> = </span>
              <span style={styles.bracket}>[</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>08</span>
              <span style={styles.indent}>            </span>
              <span style={styles.string}>"Python"</span>
              <span style={styles.comma}>,</span>
              <span style={styles.string}> "C++"</span>
              <span style={styles.comma}>,</span>
              <span style={styles.string}> "JavaScript"</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>09</span>
              <span style={styles.indent}>        </span>
              <span style={styles.bracket}>]</span>
            </div>
            <div style={styles.codeLine}>
              <span style={styles.lineNumber}>10</span>
              <span style={styles.indent}>        </span>
              <span style={styles.property}>self.passion</span>
              <span style={styles.operator}> = </span>
              <span style={styles.string}>"AI & Data Science"</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Description Only */}
      <div style={styles.aboutRightColumn}>
        
        {/* Description */}
        <div style={styles.descriptionCard}>
          <div style={styles.cardHeader}>
            <img 
              src="https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-data-analysis-seo-and-marketing-smashingstocks-outline-color-smashing-stocks.png" 
              alt="Data Analysis" 
              style={{
                width: '24px',
                height: '24px',
                marginRight: '8px'
              }}
            />
            <span style={styles.cardTitle}>README.md</span>
          </div>
          <div style={styles.descriptionContent}>
            <p style={styles.descriptionParagraph}>
              <span style={styles.highlightText}>Computer Science student</span> at Nile University with a strong 
              academic record <span style={styles.accentText}>(GPA: 3.93/4.0)</span>. Currently serving as a 
              <span style={styles.highlightText}> Junior Teaching Assistant</span> for Python Programming, 
              helping fellow students while deepening my own expertise.
            </p>
            <p style={styles.descriptionParagraph}>
              Passionate about <span style={styles.accentText}>problem-solving</span> and building innovative 
              projects. My experience spans <span style={styles.highlightText}>Python, C++, and MySQL </span> 
              with a growing focus on <span style={styles.accentText}>AI and data analysis</span>.
            </p>
            <p style={styles.descriptionParagraph}>
              Known for being <span style={styles.highlightText}>hardworking, detail-oriented</span>, and 
              collaborative. My goal is to advance in <span style={styles.accentText}>AI, data science, 
              and data analysis</span> while continuously improving my skills.
            </p>
          </div>
          
          {/* Action Buttons */}
          <div style={styles.actionButtons}>
            <button 
              style={styles.actionButton}
              onClick={() => {
                const link = document.createElement('a');
                link.href = '/CV.pdf';
                link.download = 'Abdelrhman_Ameen_CV.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }}
            >
              <span style={styles.buttonIcon}></span>
              <span>Download CV</span>
            </button>
          </div>
        </div>
        
        {/* Small Graph - Programming Languages Usage */}
        <div style={styles.smallGraphCard}>
          <div style={styles.cardHeader}>
            <span style={styles.cardIcon}></span>
            <span style={styles.cardTitle}>Tools that are used the most in my projects and work</span>
          </div>
          
          <div style={styles.smallChartContainer}>
            <Bar 
              data={{
                labels: ['Python','Power BI', 'C++' , 'SQL'],
                datasets: [{
                  label: 'Usage %',
                  data: [55, 25, 15, 10],
                  backgroundColor: [
                    'rgba(0, 255, 65, 0.8)',
                    'rgba(255, 193, 7, 0.8)',
                    'rgba(0, 204, 255, 0.8)',
                    
                    'rgba(255, 87, 34, 0.8)'
                  ],
                  borderColor: [
                    '#00ff41',
                    '#ffc107',
                    '#00ccff',
                    
                    '#ff5722'
                  ],
                  borderWidth: 2
                }]
              }} 
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: false
                  }
                },
                scales: {
                  y: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                      color: '#e0e0e0',
                      font: {
                        family: "'Fira Code', monospace",
                        size: 10
                      }
                    },
                    grid: {
                      color: 'rgba(255,255,255,0.1)'
                    }
                  },
                  x: {
                    ticks: {
                      color: '#e0e0e0',
                      font: {
                        family: "'Fira Code', monospace",
                        size: 10
                      }
                    },
                    grid: {
                      display: false
                    }
                  }
                }
              }} 
            />
          </div>
        </div>
      </div>
    </div>

    {/* Closing Bracket */}
    
  </div>
)}


{/* Projects Section */}
{activeSection === 'projects' && (
<div>
<div style={styles.sectionTitle}>{"Featured Projects </>"}</div>

<div style={styles.projectsGrid}>
{/* Project 1 */}
<div style={styles.projectCard}>
<div style={styles.projectTitle}>Interactive Text Analysis Tool</div>
<div style={styles.projectMeta}>
<img 
  src="https://img.icons8.com/color/48/python--v1.png" 
  alt="Python" 
  style={{
    width: '20px',
    height: '20px',
    marginRight: '8px'
  }}
/>
<span style={styles.fileName}>text_analyzer.py</span>
<span style={styles.commitHash}>#a7b3c2d</span>
</div>
<div style={styles.projectTags}>
<span style={styles.tag}>Python</span>
<span style={styles.tag}>Streamlit</span>
<span style={styles.tag}>NLP</span>
<span style={styles.tag}>Transformers</span>
</div>
<div style={styles.projectDescription}>
Advanced NLP-powered web application offering sentiment analysis, readability scoring,
and text transformation using state-of-the-art transformers and machine learning algorithms.
</div>
<SyntaxHighlighter
language="python"
style={atomDark}
customStyle={styles.syntaxHighlighter}
>
{textAnalysisCode}
</SyntaxHighlighter>
</div>

{/* Project 2 */}
<div style={styles.projectCard}>
<div style={styles.projectTitle}>Sales Analytics Dashboard</div>
<div style={styles.projectMeta}>
<img 
  src="https://img.icons8.com/external-flat-vol-2-vectorslab/68/external-data-visualization-big-data-flat-vol-2-vectorslab.png" 
  alt="Data Visualization" 
  style={{
    width: '20px',
    height: '20px',
    marginRight: '8px'
  }}
/>
<span style={styles.fileName}>sales_dashboard.py</span>
<span style={styles.commitHash}>#f4e6a1b</span>
</div>
<div style={styles.projectTags}>
<span style={styles.tag}>Python</span>
<span style={styles.tag}>Matplotlib</span>
<span style={styles.tag}>Pandas</span>
<span style={styles.tag}>NumPy</span>
</div>
<div style={styles.projectDescription}>
Professional-grade data visualization dashboard with real-time analytics,
interactive charts, and comprehensive business intelligence reporting.
</div>
<SyntaxHighlighter
language="python"
style={atomDark}
customStyle={styles.syntaxHighlighter}
>
{salesDashboardCode}
</SyntaxHighlighter>
</div>

{/* Project 3 */}
<div style={styles.projectCard}>
<div style={styles.projectTitle}>Bus Reservation System</div>
<div style={styles.projectMeta}>
<span style={styles.fileIcon}>⚙️</span>
<span style={styles.fileName}>BusReservationSystem.cpp</span>
<span style={styles.commitHash}>#9c8d7f3</span>
</div>
<div style={styles.projectTags}>
<span style={styles.tag}>C++17</span>
<span style={styles.tag}>STL</span>
<span style={styles.tag}>OOP</span>
<span style={styles.tag}>File I/O</span>
</div>
<div style={styles.projectDescription}>
Enterprise-level reservation management system with advanced C++ features,
memory optimization, error handling, and comprehensive logging capabilities.
</div>
<SyntaxHighlighter
language="cpp"
style={atomDark}
customStyle={styles.syntaxHighlighter}
>
{busReservationCode}
</SyntaxHighlighter>
</div>
</div>


</div>
)}

{/* Skills Section */}
{activeSection === 'skills' && (
<div>
<div style={styles.sectionTitle}>{"Technical Skills </>"}</div>

<div style={styles.skillsContainer}>
<div style={styles.skillsCategories}>



{[
{
category: '// Programming Languages',
skills: ['Python', 'C++', 'JavaScript', 'SQL']
},
{
category: '// Data Science Stack',
skills: ['Machine Learning', 'Data Analysis', 'NLP', 'Visualization']
},
{
category: '// Development Tools',
skills: ['Git/GitHub', 'VS Code', 'Docker', 'Linux']
},
{
category: '// Frameworks & Libraries',
skills: ['React', 'Streamlit', 'Pandas', 'NumPy']
}
].map((category, index) => (
<div key={index} style={styles.skillCategory}>
<div style={styles.categoryTitle}>{category.category}</div>
<div style={styles.skillTags}>
{category.skills.map((skill, skillIndex) => (
<span key={skillIndex} style={styles.skillTag}>
{skill}
</span>
))}
</div>
</div>
))}
</div>

<div style={styles.skillsChart}>
<div style={styles.chartContainer}>
<Radar data={skillsRadarData} options={radarOptions} />
</div>
</div>
</div>
</div>
)}

{/* Services Section */}
{activeSection === 'services' && (
<div>
<div style={styles.sectionTitle}>{"Services Offered </>"}</div>

<div style={styles.servicesGrid}>
<div style={styles.serviceCard}>
<div style={styles.serviceHeader}>
<img 
  src="https://img.icons8.com/external-smashingstocks-outline-color-smashing-stocks/66/external-data-analysis-seo-and-marketing-smashingstocks-outline-color-smashing-stocks.png" 
  alt="Data Analysis" 
  style={{
    width: '30px',
    height: '30px',
    marginRight: '8px'
  }}
/>
<span style={styles.serviceCode}>data_analysis.py</span>
</div>
<div style={styles.serviceTitle}>Data Analysis & Insights</div>
<div style={styles.serviceDescription}>
Transform raw datasets into actionable insights using advanced statistical analysis,
Python libraries (Pandas, NumPy), and machine learning algorithms.
</div>
<div style={styles.serviceFooter}>
<div style={styles.serviceTech}>Python • Pandas • NumPy • Scipy</div>
</div>
</div>

<div style={styles.serviceCard}>
<div style={styles.serviceHeader}>
<img 
  src="https://img.icons8.com/external-flat-vol-2-vectorslab/68/external-data-visualization-big-data-flat-vol-2-vectorslab.png" 
  alt="Data Visualization" 
  style={{
    width: '30px',
    height: '30px',
    marginRight: '8px'
  }}
/>
<span style={styles.serviceCode}>visualization.py</span>
</div>
<div style={styles.serviceTitle}>Data Visualization</div>
<div style={styles.serviceDescription}>
Create compelling visual narratives through interactive dashboards,
custom charts, and real-time data visualization using modern frameworks.
</div>
<div style={styles.serviceFooter}>
<div style={styles.serviceTech}>Matplotlib • Plotly • Power BI • D3.js</div>
</div>
</div>

<div style={styles.serviceCard}>
<div style={styles.serviceHeader}>
<img 
  src="https://img.icons8.com/fluency/48/jasper-ai.png" 
  alt="AI" 
  style={{
    width: '30px',
    height: '30px',
    marginRight: '8px'
  }}
/>
<span style={styles.serviceCode}>ml_model.py</span>
</div>
<div style={styles.serviceTitle}>AI/ML Model Development</div>
<div style={styles.serviceDescription}>
Design and implement machine learning models for various applications
including NLP, computer vision, and predictive analytics.
</div>
<div style={styles.serviceFooter}>
<div style={styles.serviceTech}>TensorFlow • PyTorch • Scikit-learn • Transformers</div>
</div>
</div>

</div>
</div>
)}

{activeSection === 'experience' && (
<div>
<div style={styles.sectionTitle}>{"Experience </>"}</div>

<div style={styles.experienceTimelineContainer}>
<div style={styles.experienceTimelineChart}>
<div style={styles.experienceTimelineTitle}>Experience Timeline</div>

<div style={styles.chartContainer}>
<Line data={experienceTimelineData} options={experienceTimelineOptions} />
</div>
</div>

<div style={styles.experienceDetailsGrid}>
<div style={styles.experienceDetailCard}>
<div style={styles.experienceDetailHeader}>
<div>
<h3 style={styles.experienceDetailTitle}>Data Analysis Intern</h3>
<p style={styles.experienceDetailCompany}>DEPI | Jun 2025 - Present</p>
</div>
</div>
<p style={styles.experienceDetailDescription}>
Comprehensive data analysis and business intelligence projects using Power BI, Python,
and advanced statistical analysis techniques for real-world datasets. Working on
data-driven insights and visualization dashboards.
</p>
<div style={styles.experienceCode}>
<span style={styles.codeKeyword}>skills</span> = [<span style={styles.codeString}>"Power BI"</span>, <span style={styles.codeString}>"Python"</span>, <span style={styles.codeString}>"SQL"</span>, <span style={styles.codeString}>"Statistics"</span>]
</div>
</div>

<div style={styles.experienceDetailCard}>
<div style={styles.experienceDetailHeader}>
<div>
<h3 style={styles.experienceDetailTitle}>AI Intern</h3>
<p style={styles.experienceDetailCompany}>GDG-NU | Feb 2025 - Jul 2025</p>
</div>
</div>
<p style={styles.experienceDetailDescription}>
Completed comprehensive AI Track with distinction, focusing on machine learning fundamentals,
deep learning architectures, and AI application development. Gained hands-on experience
with neural networks and model optimization.
</p>
<div style={styles.experienceCode}>
<span style={styles.codeKeyword}>technologies</span> = [<span style={styles.codeString}>"Machine Learning"</span>, <span style={styles.codeString}>"Deep Learning"</span>, <span style={styles.codeString}>"Python"</span>]
</div>
</div>

<div style={styles.experienceDetailCard}>
<div style={styles.experienceDetailHeader}>
<div>
<h3 style={styles.experienceDetailTitle}>AI Audio Training Production Team</h3>
<p style={styles.experienceDetailCompany}>Aligner | Jul 2025 - Present</p>
</div>
</div>
<p style={styles.experienceDetailDescription}>
Training advanced AI models for audio recognition and speech processing using cutting-edge
machine learning frameworks. Contributing to audio data preprocessing and model optimization
for real-world applications.
</p>
<div style={styles.experienceCode}>
<span style={styles.codeKeyword}>focus</span> = [<span style={styles.codeString}>"Audio ML"</span>, <span style={styles.codeString}>"Speech Processing"</span>, <span style={styles.codeString}>"TensorFlow"</span>]
</div>
</div>

<div style={styles.experienceDetailCard}>
<div style={styles.experienceDetailHeader}>
<div>
<h3 style={styles.experienceDetailTitle}>Junior Teaching Assistant</h3>
<p style={styles.experienceDetailCompany}>Nile University | Sep 2025 - Present</p>
</div>
</div>
<p style={styles.experienceDetailDescription}>
Teaching assistant for Python programming course, mentoring students in algorithm design,
debugging techniques, and software engineering best practices. Leading lab sessions and
providing one-on-one coding guidance.
</p>
<div style={styles.experienceCode}>
<span style={styles.codeKeyword}>responsibilities</span> = [<span style={styles.codeString}>"Python Teaching"</span>, <span style={styles.codeString}>"Code Review"</span>, <span style={styles.codeString}>"Mentoring"</span>]
</div>
</div>
</div>
</div>
</div>
)}

{/* Contact Section */}
{activeSection === 'contact' && (
<div>
<div style={styles.sectionTitle}>{"Get In Touch </>"}</div>

<div style={styles.contactContainer}>
<div style={styles.contactInfo}>
<div style={styles.codeBlock}>
<div style={styles.codeContent}>
<span style={styles.keyword}>const</span> <span style={styles.variable}>contactInfo</span> = {`{`}<br/>
&nbsp;&nbsp;<span style={styles.property}>status</span>: <span style={styles.string}>"Open to opportunities"</span>,<br/>
&nbsp;&nbsp;<span style={styles.property}>interests</span>: [<span style={styles.string}>"Data Science"</span>, <span style={styles.string}>"AI Development"</span>],<br/>
&nbsp;&nbsp;<span style={styles.property}>collaboration</span>: <span style={styles.boolean}>true</span>,<br/>
&nbsp;&nbsp;<span style={styles.property}>response_time</span>: <span style={styles.string}>"24 hours"</span><br/>
{`};`}
</div>
</div>

<div style={styles.contactDetails}>
<div style={styles.contactItem}>
<strong>Email:</strong> <a href="mailto:a.ameen8625@gmail.com" style={styles.contactLink}>a.ameen8625@gmail.com</a>
</div>
<div style={styles.contactItem}>
<strong>LinkedIn:</strong> <a href="#" style={styles.contactLink}>linkedin.com/in/abdelrhman-ameen</a>
</div>
<div style={styles.contactItem}>
<strong>GitHub:</strong> <a href="#" style={styles.contactLink}>github.com/Abdelrhman-Ameen</a>
</div>
<div style={styles.contactItem}>
<strong>Phone:</strong> +20 1140801091
</div>
<div style={styles.contactItem}>
<strong>Location:</strong> Giza, Egypt
</div>
</div>
</div>

<div style={styles.contactForm}>
<div style={styles.codeComment}>
<span style={styles.commentSymbol}>{"// Send Message"}</span>
</div>
<form style={styles.form}>
<input
type="text"
placeholder="Your Name"
style={styles.input}
/>
<input
type="email"
placeholder="Your Email"
style={styles.input}
/>
<textarea
placeholder="Your Message"
style={{...styles.input, ...styles.textarea}}
></textarea>
<button type="submit" style={styles.submitButton}>
{"// Send Message"}
</button>
</form>
</div>
</div>
</div>
)}

</div>
</main>
</div>
);
};

// Enhanced Styles مع التحديثات الجديدة
const styles = {
container: {
fontFamily: "'Fira Code', 'Consolas', 'SF Mono', monospace",
backgroundColor: '#0a0a0a',
color: '#e0e0e0',
minHeight: '100vh',
fontSize: '14px',
lineHeight: '1.6'
},

loader: {
position: 'fixed',
top: 0,
left: 0,
right: 0,
bottom: 0,
backgroundColor: '#0a0a0a',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
zIndex: 1000
},

loaderContent: {
textAlign: 'center'
},

dataStream: {
fontFamily: "'Fira Code', monospace",
fontSize: '16px',
color: '#00ff41',
lineHeight: '1.8',
textAlign: 'left'
},

nav: {
display: 'flex',
justifyContent: 'space-between',
alignItems: 'center',
padding: '1rem 2rem',
backgroundColor: '#1a1a1a',
borderBottom: '1px solid #333',
position: 'sticky',
top: 0,
zIndex: 100
},

navBrand: {
display: 'flex',
alignItems: 'center',
gap: '1rem'
},

logo: {
fontSize: '24px',
fontWeight: 'bold',
color: '#00ff41'
},

brandText: {
fontSize: '16px',
color: '#e0e0e0',
fontFamily: "'Fira Code', monospace"
},

navLinks: {
display: 'flex',
gap: '1rem'
},

navLink: {
  background: 'none',
  border: 'none',
  color: '#b0b0b0',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  transition: 'color 0.3s, background 0.3s',
  fontFamily: "'Fira Code', monospace",
  outline: 'none',                
  backgroundColor: 'rgb(26,26,26)'
},


navLinkActive: {
color: '#00ff41',
backgroundColor: '#1a3a1a'
},

navLinkPrefix: {
color: '#666'
},

navLinkSuffix: {
color: '#888'
},

main: {
padding: '2rem'
},

section: {
maxWidth: '1200px',
margin: '0 auto',
padding: '2rem 0'
},

sectionTitle: {
fontSize: '2.5rem',
marginBottom: '2rem',
color: '#00ff41',
borderBottom: '2px solid #00ff41',
paddingBottom: '0.5rem',
fontFamily: "'Fira Code', monospace"
},

hero: {
display: 'grid',
gridTemplateColumns: '1fr 1fr',
gap: '3rem',
alignItems: 'center',
minHeight: '70vh'
},

heroContent: {
padding: '2rem'
},

profilePicture: {
display: 'flex',
justifyContent: 'center',
marginBottom: '1.5rem'
},

profilePlaceholder: {
width: '120px',
height: '120px',
borderRadius: '50%',
backgroundColor: '#1a1a1a',
border: '3px solid #00ff41',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
fontSize: '1.2rem',
fontWeight: 'bold',
color: '#00ff41',
fontFamily: "'Fira Code', monospace"
},

profileInitials: {
fontSize: '1.2rem',
fontWeight: 'bold'
},

heroTitle: {
fontSize: '3rem',
marginBottom: '0.5rem',
lineHeight: '1.2',
color: '#e0e0e0',
fontFamily: "'Fira Code', monospace"
},

heroSubtitle: {
fontSize: '1.5rem',
marginBottom: '1rem',
lineHeight: '1.2',
color: '#888',
fontFamily: "'Fira Code', monospace"
},

uspContainer: {
marginBottom: '2rem'
},

codeComment: {
marginBottom: '1rem'
},

commentSymbol: {
color: '#666',
fontSize: '1.1rem'
},

heroDescription: {
fontSize: '1.1rem',
lineHeight: '1.6',
margin: '0.5rem 0',
color: '#b0b0b0'
},

personalSlogan: {
fontSize: '1.2rem',
lineHeight: '1.4',
textAlign: 'center',
padding: '1rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #00ff41',
fontFamily: "'Fira Code', monospace",
marginBottom: '1rem'
},

stringDelimiter: {
color: '#ffa500'
},

accent: {
color: '#00ff41'
},

heroStats: {
display: 'grid',
gridTemplateColumns: 'repeat(4, 1fr)',
gap: '1rem',
marginBottom: '2rem'
},

stat: {
textAlign: 'center',
padding: '1rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

statValue: {
fontSize: '2rem',
fontWeight: 'bold',
color: '#00ff41'
},

statLabel: {
fontSize: '0.9rem',
color: '#888'
},

terminalContainer: {
backgroundColor: '#1e1e1e',
borderRadius: '8px',
border: '1px solid #333',
overflow: 'hidden',
marginTop: '1rem',
position: 'relative',
width: '113%',
left: '36.9rem',
top:'-13rem'
},

terminalHeader: {
backgroundColor: '#2d2d2d',
padding: '0.5rem 1rem',
display: 'flex',
alignItems: 'center',
gap: '0.5rem'
},

terminalButton: {
width: '12px',
height: '12px',
borderRadius: '50%'
},

terminalTitle: {
color: '#e0e0e0',
fontSize: '0.9rem',
fontFamily: "'Fira Code', monospace",
marginLeft: '1rem'
},

terminalBody: {
padding: '1rem',
minHeight: '100px'
},

terminalText: {
color: '#00ff41',
fontSize: '0.9rem',
fontFamily: "'Fira Code', monospace",
margin: 0,
whiteSpace: 'pre-wrap'
},

heroChart: {
paddingTop: '1rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333',
marginBottom: '30rem',
},

chartTitle: {
marginBottom: '1rem',
color: '#00ff41',
fontSize: '1.2rem',
fontFamily: "'Fira Code', monospace",
},

chartContainer: {
  width: '100%',
  position: 'relative'
},

aboutContainer: {
display: 'grid',
gridTemplateColumns: '2fr 1fr',
gap: '3rem',
alignItems: 'start'
},

aboutContent: {
padding: '1rem'
},

codeBlock: {
backgroundColor: '#1e1e1e',
borderRadius: '8px',
border: '1px solid #333',
padding: '1rem',
marginBottom: '2rem',
display: 'flex',
gap: '1rem',
fontFamily: "'Fira Code', monospace"
},

codeLineNumbers: {
color: '#666',
fontSize: '0.9rem',
lineHeight: '1.5',
textAlign: 'right',
paddingRight: '1rem',
borderRight: '1px solid #333',
minWidth: '30px'
},

codeContent: {
color: '#e0e0e0',
fontSize: '0.9rem',
lineHeight: '1.5',
flex: 1
},

keyword: {
color: '#569cd6'
},

variable: {
color: '#9cdcfe'
},

property: {
color: '#92c5f7'
},

string: {
color: '#ce9178'
},

number: {
color: '#b5cea8'
},

boolean: {
color: '#569cd6'
},

experienceGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
gap: '1.5rem'
},

experienceItem: {
padding: '1.5rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

aboutChart: {
padding: '2rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

projectsGrid: {
display: 'grid',
gap: '2rem',
marginBottom: '3rem'
},

projectCard: {
padding: '2rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

projectTitle: {
color: '#00ff41',
marginBottom: '1rem',
fontSize: '1.3rem',
fontFamily: "'Fira Code', monospace"
},

projectMeta: {
display: 'flex',
alignItems: 'center',
gap: '0.5rem',
marginBottom: '1rem',
fontSize: '0.9rem',
color: '#888'
},

fileIcon: {
fontSize: '1.2rem'
},

fileName: {
color: '#9cdcfe',
fontFamily: "'Fira Code', monospace"
},

commitHash: {
color: '#666',
fontFamily: "'Fira Code', monospace"
},

projectTags: {
display: 'flex',
gap: '0.5rem',
marginBottom: '1rem',
flexWrap: 'wrap'
},

tag: {
padding: '0.25rem 0.75rem',
backgroundColor: '#2a2a2a',
borderRadius: '12px',
fontSize: '0.8rem',
color: '#00ff41',
border: '1px solid #444',
fontFamily: "'Fira Code', monospace"
},

projectDescription: {
marginBottom: '1.5rem',
color: '#b0b0b0',
lineHeight: '1.6'
},

syntaxHighlighter: {
margin: 0,
fontSize: '11px',
borderRadius: '8px'
},

performanceSection: {
padding: '2rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

skillsContainer: {
display: 'grid',
gridTemplateColumns: '1fr 1fr',
gap: '3rem'
},

skillsChart: {
padding: '2rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

skillsCategories: {
display: 'flex',
flexDirection: 'column',
gap: '1.5rem'
},

skillCategory: {
padding: '1.5rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

categoryTitle: {
color: '#00ff41',
marginBottom: '1rem',
fontSize: '1.1rem',
fontFamily: "'Fira Code', monospace"
},

skillTags: {
display: 'flex',
flexWrap: 'wrap',
gap: '0.5rem'
},

skillTag: {
padding: '0.25rem 0.75rem',
backgroundColor: '#2a2a2a',
borderRadius: '12px',
fontSize: '0.8rem',
color: '#e0e0e0',
border: '1px solid #444',
fontFamily: "'Fira Code', monospace"
},

servicesGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
gap: '2rem'
},

serviceCard: {
padding: '2rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333',
transition: 'transform 0.3s, border-color 0.3s',
cursor: 'pointer'
},

serviceHeader: {
display: 'flex',
alignItems: 'center',
gap: '0.5rem',
marginBottom: '1rem'
},

serviceIcon: {
fontSize: '2rem',

},

serviceCode: {
color: '#9cdcfe',
fontFamily: "'Fira Code', monospace",
fontSize: '0.9rem',
},

serviceTitle: {
color: '#00ff41',
marginBottom: '1rem',
fontSize: '1.3rem',
fontFamily: "'Fira Code', monospace"
},

serviceDescription: {
color: '#b0b0b0',
lineHeight: '2.1',
fontSize: '1.1rem',
marginBottom: '3rem'
},

serviceFooter: {
borderTop: '2px solid #333',
paddingTop: '1rem'
},

serviceTech: {
color: '#666',
fontSize: '0.8rem',
fontFamily: "'Fira Code', monospace"
},

experienceTimelineContainer: {
display: 'flex',
flexDirection: 'column',
gap: '2rem'
},

experienceTimelineChart: {
padding: '2rem',
backgroundColor: '#1a1a1a',
borderRadius: '12px',
border: '2px solid #00ff41',
boxShadow: '0 4px 20px rgba(0, 255, 65, 0.1)'
},

experienceTimelineTitle: {
fontSize: '1.5rem',
marginBottom: '1rem',
color: '#00ff41',
fontFamily: "'Fira Code', monospace"
},

experienceTimelineDescription: {
marginBottom: '2rem',
textAlign: 'center',
padding: '1rem',
backgroundColor: '#0f0f0f',
borderRadius: '8px',
border: '1px solid #333',
color: '#6a9955',
fontStyle: 'italic',
fontFamily: "'Fira Code', monospace"
},

experienceDetailsGrid: {
display: 'grid',
gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
gap: '2rem'
},

experienceDetailCard: {
padding: '2rem',
backgroundColor: 'linear-gradient(135deg, #1a1a1a 0%, #252525 100%)',
borderRadius: '16px',
border: '2px solid #333',
transition: 'all 0.3s ease',
position: 'relative',
overflow: 'hidden',
boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
},

experienceDetailHeader: {
display: 'flex',
alignItems: 'flex-start',
gap: '1rem',
marginBottom: '1.5rem'
},

experienceDetailTitle: {
fontSize: '1.2rem',
color: '#00ff41',
margin: '0 0 0.5rem 0',
fontWeight: 'bold',
fontFamily: "'Fira Code', monospace"
},

experienceDetailCompany: {
color: '#888',
fontSize: '1rem',
margin: 0,
fontStyle: 'italic'
},

experienceDetailDescription: {
color: '#b0b0b0',
lineHeight: '1.7',
fontSize: '1rem',
marginBottom: '1.5rem'
},

experienceCode: {
backgroundColor: '#0f0f0f',
padding: '1rem',
borderRadius: '8px',
border: '1px solid #00ff41',
fontFamily: "'Fira Code', monospace",
fontSize: '0.9rem'
},

codeKeyword: {
color: '#569cd6'
},

codeString: {
color: '#ce9178'
},

contactContainer: {
display: 'grid',
gridTemplateColumns: '1fr 1fr',
gap: '3rem'
},

contactInfo: {
padding: '1rem'
},

contactDetails: {
display: 'flex',
flexDirection: 'column',
gap: '1rem',
marginTop: '2rem'
},

contactItem: {
padding: '1rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

contactLink: {
color: '#00ff41',
textDecoration: 'none',
transition: 'color 0.3s'
},

contactForm: {
padding: '2rem',
backgroundColor: '#1a1a1a',
borderRadius: '8px',
border: '1px solid #333'
},

form: {
display: 'flex',
flexDirection: 'column',
gap: '1rem'
},

input: {
padding: '1rem',
backgroundColor: '#2a2a2a',
border: '1px solid #444',
borderRadius: '4px',
color: '#e0e0e0',
fontSize: '14px',
fontFamily: "'Fira Code', monospace"
},

textarea: {
resize: 'vertical',
minHeight: '100px'
},

submitButton: {
padding: '1rem 2rem',
backgroundColor: '#00ff41',
color: '#0a0a0a',
border: 'none',
borderRadius: '4px',
cursor: 'pointer',
fontSize: '14px',
fontWeight: 'bold',
transition: 'background 0.3s',
fontFamily: "'Fira Code', monospace"
},
// Add these new styles to your existing styles object

aboutSection: {
  maxWidth: '1400px',
  margin: '0 auto',
  padding: '2rem'
},

aboutHeader: {
  textAlign: 'center',
  marginBottom: '3rem'
},

aboutTitleContainer: {
  fontSize: '3rem',
  marginBottom: '1rem',
  fontFamily: "'Fira Code', monospace"
},

commentPrefix: {
  color: '#666',
  marginRight: '1rem'
},

aboutTitle: {
  color: '#00ff41',
  fontWeight: 'bold'
},

commentSuffix: {
  color: '#666',
  marginLeft: '1rem'
},

aboutSubtitle: {
  fontSize: '1.5rem',
  fontFamily: "'Fira Code', monospace",
  marginBottom: '1rem'
},

constKeyword: {
  color: '#569cd6'
},

variableName: {
  color: '#9cdcfe'
},

operator: {
  color: '#d4d4d4'
},

bracket: {
  color: '#ffd700'
},

aboutMainGrid: {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '3rem',
  marginBottom: '2rem'
},

aboutLeftColumn: {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
},

aboutRightColumn: {
  display: 'flex',
  flexDirection: 'column',
  gap: '2rem'
},

profileCard: {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  borderRadius: '16px',
  border: '2px solid #00ff41',
  padding: '0',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 255, 65, 0.1)'
},

cardHeader: {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem 1.5rem',
  backgroundColor: '#0f0f0f',
  borderBottom: '1px solid #333'
},

cardIcon: {
  fontSize: '1.2rem',
  marginRight: '0.5rem'
},

cardTitle: {
  color: '#00ff41',
  fontFamily: "'Fira Code', monospace",
  fontSize: '0.9rem',
  flex: 1
},

cardActions: {
  display: 'flex',
  gap: '0.5rem'
},

cardAction: {
  color: '#666',
  fontSize: '0.8rem'
},

profileContent: {
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1.5rem'
},

profileAvatar: {
  position: 'relative',
  width: '100px',
  height: '100px',
  borderRadius: '50%',
  background: 'linear-gradient(45deg, #00ff41, #00cc33)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  color: '#0a0a0a',
  boxShadow: '0 0 20px rgba(0, 255, 65, 0.3)'
},

profileInitials: {
  fontFamily: "'Fira Code', monospace"
},

statusIndicator: {
  position: 'absolute',
  bottom: '5px',
  right: '5px',
  width: '20px',
  height: '20px',
  borderRadius: '50%',
  backgroundColor: '#00ff41',
  border: '3px solid #1a1a1a',
  animation: 'pulse 2s infinite'
},

profileInfo: {
  textAlign: 'center'
},

profileName: {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#e0e0e0',
  marginBottom: '0.5rem',
  fontFamily: "'Fira Code', monospace"
},

profileRole: {
  fontSize: '1rem',
  color: '#00ff41',
  marginBottom: '0.5rem',
  fontFamily: "'Fira Code', monospace"
},

rolePrefix: {
  color: '#666'
},

profileLocation: {
  fontSize: '0.9rem',
  color: '#888',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem'
},

locationIcon: {
  fontSize: '1rem'
},

statsGrid: {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '1rem',
  padding: '1.5rem',
  backgroundColor: '#0f0f0f',
  borderTop: '1px solid #333'
},

statItem: {
  textAlign: 'center'
},

statValue: {
  fontSize: '1.5rem',
  fontWeight: 'bold',
  color: '#00ff41',
  fontFamily: "'Fira Code', monospace"
},

statLabel: {
  fontSize: '0.8rem',
  color: '#888',
  marginTop: '0.25rem'
},

codeCard: {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  borderRadius: '16px',
  border: '2px solid #333',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
},

codeContent: {
  padding: '1.5rem',
  backgroundColor: '#0f0f0f',
  fontFamily: "'Fira Code', monospace",
  fontSize: '0.85rem',
  lineHeight: '1.6'
},

codeLine: {
  display: 'flex',
  alignItems: 'center',
  marginBottom: '0.3rem',
  transition: 'background 0.2s'
},

lineNumber: {
  color: '#666',
  marginRight: '1rem',
  width: '25px',
  textAlign: 'right',
  fontSize: '0.8rem'
},

keyword: {
  color: '#569cd6'
},

className: {
  color: '#4ec9b0'
},

functionName: {
  color: '#dcdcaa'
},

property: {
  color: '#9cdcfe'
},

string: {
  color: '#ce9178'
},

number: {
  color: '#b5cea8'
},

comma: {
  color: '#d4d4d4'
},

indent: {
  color: 'transparent'
},

skillsChartCard: {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  borderRadius: '16px',
  border: '2px solid #333',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
},

chartDescription: {
  padding: '1rem 1.5rem 0',
  fontFamily: "'Fira Code', monospace",
  fontSize: '0.9rem'
},

commentText: {
  color: '#6a9955',
  fontStyle: 'italic'
},

chartContainer: {
  height: '400px',
  padding: '2rem'
},

descriptionCard: {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  borderRadius: '16px',
  border: '2px solid #333',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)'
},

descriptionContent: {
  padding: '1.5rem'
},

descriptionParagraph: {
  fontSize: '1rem',
  lineHeight: '1.7',
  marginBottom: '1.2rem',
  color: '#d4d4d4'
},

highlightText: {
  color: '#00ff41',
  fontWeight: 'bold'
},

accentText: {
  color: '#ffd700',
  fontWeight: 'bold'
},

actionButtons: {
  display: 'flex',
  justifyContent: 'center',
  padding: '1.5rem',
  backgroundColor: '#0f0f0f',
  borderTop: '1px solid #333'
},

actionButton: {
  background: 'linear-gradient(45deg, #00ff41, #00cc33)',
  color: '#0a0a0a',
  border: 'none',
  borderRadius: '8px',
  padding: '0.75rem 1.5rem',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: 'transform 0.2s, box-shadow 0.2s',
  fontFamily: "'Fira Code', monospace",
  flex: 1
},

actionButtonSecondary: {
  background: 'transparent',
  color: '#00ff41',
  border: '2px solidrgb(0, 200, 255)',
  borderRadius: '8px',
  padding: '0.75rem 1.5rem',
  fontSize: '0.9rem',
  fontWeight: 'bold',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  transition: 'all 0.2s',
  fontFamily: "'Fira Code', monospace",
  flex: 1,
  textAlign: 'center',
  
},

buttonIcon: {
  width:'40%',
  fontSize: '1rem',
  textAlign: 'center',
},

smallGraphCard: {
  background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
  borderRadius: '16px',
  border: '2px solid #333',
  overflow: 'hidden',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
},

smallChartContainer: {
  height: '200px',
  padding: '1rem',
},

aboutFooter: {
  textAlign: 'center',
  fontSize: '2rem',
  color: '#ffd700',
  fontFamily: "'Fira Code', monospace",
  marginTop: '2rem'
}

};

export default AbdelrhmanPortfolio;
