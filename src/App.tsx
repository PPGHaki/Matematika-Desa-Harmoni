/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ScreenState, LevelKey, QuestionData } from './types/game';
import { QUESTION_BANK, LEVEL_METADATA } from './data/questions';
import { HeaderNav } from './components/HeaderNav';
import { CoverScreen } from './components/CoverScreen';
import { LevelSelectScreen } from './components/LevelSelectScreen';
import { GameScreen } from './components/GameScreen';
import { ResultScreen } from './components/ResultScreen';
import { MateriModal } from './components/MateriModal';
import { KadesModal } from './components/KadesModal';
import { sound, stopSpeech } from './utils/sound';

export default function App() {
  const [screen, setScreen] = useState<ScreenState>('cover');
  const [currentLevelKey, setCurrentLevelKey] = useState<LevelKey>('mudah');
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);

  // Sound and music state
  const [sfxActive, setSfxActive] = useState<boolean>(true);
  const [musicActive, setMusicActive] = useState<boolean>(false);

  // Modals state
  const [isMateriOpen, setIsMateriOpen] = useState<boolean>(false);
  const [isKadesModalOpen, setIsKadesModalOpen] = useState<boolean>(false);

  const currentQuestions: QuestionData[] = QUESTION_BANK[currentLevelKey];
  const currentQuestion: QuestionData = currentQuestions[questionIndex] || currentQuestions[0];

  const handleStartGame = () => {
    stopSpeech();
    setScreen('levels');
  };

  const handleSelectLevel = (level: LevelKey) => {
    stopSpeech();
    setCurrentLevelKey(level);
    setQuestionIndex(0);
    setScore(0);
    setScreen('game');
  };

  const handleNextQuestion = () => {
    stopSpeech();
    if (questionIndex + 1 < currentQuestions.length) {
      setQuestionIndex(prev => prev + 1);
    } else {
      setScreen('result');
    }
  };

  const handleAddScore = (points: number) => {
    setScore(prev => prev + points);
  };

  const handleRestartLevel = () => {
    stopSpeech();
    setQuestionIndex(0);
    setScore(0);
    setScreen('game');
  };

  const handleGoToLevels = () => {
    stopSpeech();
    setScreen('levels');
  };

  const handleGoToCover = () => {
    stopSpeech();
    setScreen('cover');
  };

  const handleToggleSfx = () => {
    sound.sfxEnabled = !sound.sfxEnabled;
    setSfxActive(sound.sfxEnabled);
    if (sound.sfxEnabled) {
      sound.playClick();
    }
  };

  const handleToggleMusic = () => {
    const isNowOn = sound.toggleMusic();
    setMusicActive(isNowOn);
  };

  return (
    <div className="min-h-screen relative flex flex-col justify-between selection:bg-amber-300 selection:text-amber-950 font-sans">
      
      {/* Scenic Background Image Layer (Matching Image 1) */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
        style={{
          backgroundImage: `url('/assets/bg_desa_harmoni.jpg')`,
        }}
      >
        {/* Soft atmospheric overlay ensuring high readability of game components */}
        <div className="absolute inset-0 bg-gradient-to-b from-amber-950/25 via-emerald-950/20 to-amber-950/35 backdrop-blur-[1px]" />
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 flex flex-col min-h-screen justify-between">
        
        {/* Header Bar */}
        <HeaderNav 
          score={score}
          currentQuestionIndex={questionIndex}
          totalQuestions={currentQuestions.length}
          levelTitle={LEVEL_METADATA[currentLevelKey].title}
          isGameActive={screen === 'game'}
          onHomeClick={handleGoToCover}
          onMateriClick={() => setIsMateriOpen(true)}
          onKadesProfileClick={() => setIsKadesModalOpen(true)}
          sfxActive={sfxActive}
          musicActive={musicActive}
          onToggleSfx={handleToggleSfx}
          onToggleMusic={handleToggleMusic}
        />

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col justify-center py-4 px-2 sm:px-4">
          {screen === 'cover' && (
            <CoverScreen 
              onStartClick={handleStartGame}
              onMateriClick={() => setIsMateriOpen(true)}
              onKadesProfileClick={() => setIsKadesModalOpen(true)}
            />
          )}

          {screen === 'levels' && (
            <LevelSelectScreen 
              onSelectLevel={handleSelectLevel}
              onBackToCover={handleGoToCover}
              onMateriClick={() => setIsMateriOpen(true)}
            />
          )}

          {screen === 'game' && (
            <GameScreen 
              question={currentQuestion}
              questionIndex={questionIndex}
              totalQuestions={currentQuestions.length}
              levelKey={currentLevelKey}
              levelTitle={LEVEL_METADATA[currentLevelKey].title}
              onNextQuestion={handleNextQuestion}
              onPrevLevelSelect={handleGoToLevels}
              onAddScore={handleAddScore}
            />
          )}

          {screen === 'result' && (
            <ResultScreen 
              score={score}
              totalQuestions={currentQuestions.length}
              levelTitle={LEVEL_METADATA[currentLevelKey].title}
              onRestartLevel={handleRestartLevel}
              onGoToLevels={handleGoToLevels}
              onGoToCover={handleGoToCover}
            />
          )}
        </main>

        {/* Footer */}
        <footer className="text-center py-3 text-[11px] sm:text-xs text-white/90 font-medium bg-amber-950/80 backdrop-blur-sm border-t border-amber-600/50 shadow-md">
          <p>
            🌾 <strong>Petualangan Berbagi di Desa Harmoni</strong> • Pembelajaran Matematika SD Kelas 4
          </p>
          <p className="text-amber-200/80 text-[10px] mt-0.5">
            Konsep Pembagian sebagai Pengurangan Berulang & Penalaran HOTS bersama Pak Kepala Desa
          </p>
        </footer>

      </div>

      {/* Educational Modals */}
      <MateriModal 
        isOpen={isMateriOpen}
        onClose={() => setIsMateriOpen(false)}
      />

      <KadesModal 
        isOpen={isKadesModalOpen}
        onClose={() => setIsKadesModalOpen(false)}
      />

    </div>
  );
}
