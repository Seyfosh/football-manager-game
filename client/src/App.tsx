import { useState } from 'react'
import LobbyScreen from './pages/LobbyScreen'
import DraftScreen from './pages/DraftScreen'
import SquadScreen from './pages/SquadScreen'
import TransferMarketScreen from './pages/TransferMarketScreen'
import MatchScreen from './pages/MatchScreen'
import LeagueScreen from './pages/LeagueScreen'
import EndOfSeasonScreen from './pages/EndOfSeasonScreen'
import ChampionsLeagueScreen from './pages/ChampionsLeagueScreen'
import NavBar from './components/NavBar'

const TEAM_PLAYERS: Record<string, any[]> = {
 'Manchester City': [
    { id: 1, name: 'Erling Haaland', club: 'Manchester City', position: 'ST', age: 25, ovr: 91, pace: 97, shooting: 97, passing: 65, dribbling: 80, defending: 45, physical: 88, fitness: 95, morale: 'High', status: 'Healthy' },
    { id: 3, name: 'Rodri', club: 'Manchester City', position: 'CDM', age: 29, ovr: 91, pace: 72, shooting: 72, passing: 89, dribbling: 82, defending: 89, physical: 85, fitness: 92, morale: 'Very High', status: 'Healthy' },
    { id: 4, name: 'Phil Foden', club: 'Manchester City', position: 'CAM', age: 25, ovr: 88, pace: 83, shooting: 83, passing: 86, dribbling: 91, defending: 60, physical: 71, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 5, name: 'Ruben Dias', club: 'Manchester City', position: 'CB', age: 28, ovr: 88, pace: 76, shooting: 45, passing: 75, dribbling: 65, defending: 90, physical: 86, fitness: 92, morale: 'High', status: 'Healthy' },
    { id: 6, name: 'Gianluigi Donnarumma', club: 'Manchester City', position: 'GK', age: 26, ovr: 89, pace: 54, shooting: 22, passing: 72, dribbling: 36, defending: 89, physical: 78, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 66, name: 'Bernardo Silva', club: 'Manchester City', position: 'CM', age: 31, ovr: 87, pace: 80, shooting: 79, passing: 87, dribbling: 89, defending: 67, physical: 69, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 101, name: 'Rico Lewis', club: 'Manchester City', position: 'RB', age: 20, ovr: 79, pace: 78, shooting: 56, passing: 76, dribbling: 74, defending: 78, physical: 70, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 102, name: 'Josko Gvardiol', club: 'Manchester City', position: 'LB', age: 23, ovr: 85, pace: 82, shooting: 52, passing: 72, dribbling: 68, defending: 85, physical: 83, fitness: 92, morale: 'High', status: 'Healthy' },
    { id: 103, name: 'Tijjani Reijnders', club: 'Manchester City', position: 'CM', age: 27, ovr: 85, pace: 80, shooting: 76, passing: 84, dribbling: 82, defending: 74, physical: 76, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 104, name: 'Omar Marmoush', club: 'Manchester City', position: 'ST', age: 26, ovr: 84, pace: 88, shooting: 84, passing: 76, dribbling: 84, defending: 42, physical: 74, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 105, name: 'Rayan Ait-Nouri', club: 'Manchester City', position: 'LB', age: 24, ovr: 83, pace: 88, shooting: 58, passing: 74, dribbling: 78, defending: 80, physical: 74, fitness: 89, morale: 'High', status: 'Healthy' },
  ],
  'Arsenal': [
    { id: 7, name: 'Bukayo Saka', club: 'Arsenal', position: 'RW', age: 23, ovr: 89, pace: 90, shooting: 83, passing: 86, dribbling: 89, defending: 71, physical: 73, fitness: 92, morale: 'Very High', status: 'Healthy' },
    { id: 8, name: 'Martin Odegaard', club: 'Arsenal', position: 'CAM', age: 26, ovr: 88, pace: 78, shooting: 81, passing: 91, dribbling: 88, defending: 72, physical: 68, fitness: 90, morale: 'Very High', status: 'Healthy' },
    { id: 9, name: 'Declan Rice', club: 'Arsenal', position: 'CDM', age: 26, ovr: 88, pace: 75, shooting: 72, passing: 83, dribbling: 79, defending: 89, physical: 87, fitness: 93, morale: 'High', status: 'Healthy' },
    { id: 10, name: 'Gabriel Magalhaes', club: 'Arsenal', position: 'CB', age: 27, ovr: 87, pace: 74, shooting: 50, passing: 68, dribbling: 58, defending: 89, physical: 86, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 11, name: 'Kepa Arrizabalaga', club: 'Arsenal', position: 'GK', age: 30, ovr: 84, pace: 50, shooting: 22, passing: 70, dribbling: 32, defending: 84, physical: 68, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 65, name: 'Ben White', club: 'Arsenal', position: 'RB', age: 28, ovr: 84, pace: 80, shooting: 58, passing: 76, dribbling: 72, defending: 85, physical: 76, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 105, name: 'Gabriel Martinelli', club: 'Arsenal', position: 'LW', age: 24, ovr: 84, pace: 92, shooting: 78, passing: 72, dribbling: 84, defending: 52, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 106, name: 'Viktor Gyokeres', club: 'Arsenal', position: 'ST', age: 27, ovr: 88, pace: 86, shooting: 90, passing: 72, dribbling: 80, defending: 44, physical: 84, fitness: 92, morale: 'High', status: 'Healthy' },
    { id: 107, name: 'Jurrien Timber', club: 'Arsenal', position: 'LB', age: 24, ovr: 83, pace: 80, shooting: 52, passing: 74, dribbling: 72, defending: 83, physical: 74, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 108, name: 'Martin Zubimendi', club: 'Arsenal', position: 'CDM', age: 26, ovr: 86, pace: 72, shooting: 68, passing: 84, dribbling: 78, defending: 86, physical: 76, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 109, name: 'William Saliba', club: 'Arsenal', position: 'CB', age: 24, ovr: 87, pace: 80, shooting: 44, passing: 72, dribbling: 62, defending: 89, physical: 82, fitness: 93, morale: 'Very High', status: 'Healthy' },
  ],
  'Real Madrid': [
    { id: 12, name: 'Vinicius Jr', club: 'Real Madrid', position: 'LW', age: 25, ovr: 92, pace: 97, shooting: 86, passing: 78, dribbling: 95, defending: 32, physical: 73, fitness: 94, morale: 'Very High', status: 'Healthy' },
    { id: 13, name: 'Jude Bellingham', club: 'Real Madrid', position: 'CAM', age: 22, ovr: 91, pace: 83, shooting: 86, passing: 87, dribbling: 89, defending: 77, physical: 83, fitness: 92, morale: 'Very High', status: 'Healthy' },
    { id: 14, name: 'Kylian Mbappe', club: 'Real Madrid', position: 'ST', age: 26, ovr: 93, pace: 99, shooting: 93, passing: 80, dribbling: 92, defending: 36, physical: 78, fitness: 95, morale: 'High', status: 'Healthy' },
    { id: 15, name: 'Federico Valverde', club: 'Real Madrid', position: 'CM', age: 27, ovr: 89, pace: 86, shooting: 80, passing: 84, dribbling: 82, defending: 78, physical: 82, fitness: 93, morale: 'High', status: 'Healthy' },
    { id: 16, name: 'Antonio Rudiger', club: 'Real Madrid', position: 'CB', age: 32, ovr: 85, pace: 82, shooting: 48, passing: 68, dribbling: 58, defending: 88, physical: 90, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 17, name: 'Thibaut Courtois', club: 'Real Madrid', position: 'GK', age: 33, ovr: 90, pace: 52, shooting: 25, passing: 72, dribbling: 35, defending: 90, physical: 78, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 67, name: 'Aurelien Tchouameni', club: 'Real Madrid', position: 'CDM', age: 25, ovr: 86, pace: 76, shooting: 68, passing: 82, dribbling: 78, defending: 86, physical: 84, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 110, name: 'Trent Alexander-Arnold', club: 'Real Madrid', position: 'RB', age: 26, ovr: 87, pace: 80, shooting: 76, passing: 90, dribbling: 80, defending: 78, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 111, name: 'Ferland Mendy', club: 'Real Madrid', position: 'LB', age: 30, ovr: 83, pace: 86, shooting: 52, passing: 70, dribbling: 72, defending: 83, physical: 78, fitness: 89, morale: 'Medium', status: 'Healthy' },
    { id: 112, name: 'Eder Militao', club: 'Real Madrid', position: 'CB', age: 27, ovr: 85, pace: 80, shooting: 46, passing: 68, dribbling: 62, defending: 87, physical: 82, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 113, name: 'Rodrygo', club: 'Real Madrid', position: 'RW', age: 24, ovr: 84, pace: 88, shooting: 80, passing: 76, dribbling: 86, defending: 38, physical: 66, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 114, name: 'Eduardo Camavinga', club: 'Real Madrid', position: 'CM', age: 22, ovr: 84, pace: 82, shooting: 68, passing: 80, dribbling: 82, defending: 76, physical: 76, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 115, name: 'Dean Huijsen', club: 'Real Madrid', position: 'CB', age: 20, ovr: 80, pace: 78, shooting: 44, passing: 68, dribbling: 60, defending: 82, physical: 78, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 116, name: 'Arda Guler', club: 'Real Madrid', position: 'CAM', age: 20, ovr: 82, pace: 78, shooting: 78, passing: 84, dribbling: 86, defending: 52, physical: 64, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 117, name: 'Endrick', club: 'Real Madrid', position: 'ST', age: 18, ovr: 78, pace: 84, shooting: 78, passing: 64, dribbling: 78, defending: 36, physical: 72, fitness: 87, morale: 'High', status: 'Healthy' },
  ],
  'Barcelona': [
    { id: 18, name: 'Robert Lewandowski', club: 'Barcelona', position: 'ST', age: 37, ovr: 86, pace: 74, shooting: 90, passing: 76, dribbling: 80, defending: 40, physical: 78, fitness: 82, morale: 'High', status: 'Healthy' },
    { id: 19, name: 'Pedri', club: 'Barcelona', position: 'CM', age: 22, ovr: 88, pace: 80, shooting: 74, passing: 91, dribbling: 91, defending: 73, physical: 67, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 20, name: 'Lamine Yamal', club: 'Barcelona', position: 'RW', age: 18, ovr: 89, pace: 93, shooting: 82, passing: 84, dribbling: 93, defending: 40, physical: 63, fitness: 92, morale: 'Very High', status: 'Healthy' },
    { id: 21, name: 'Frenkie de Jong', club: 'Barcelona', position: 'CM', age: 28, ovr: 86, pace: 78, shooting: 72, passing: 88, dribbling: 86, defending: 76, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 22, name: 'Ronald Araujo', club: 'Barcelona', position: 'CB', age: 26, ovr: 87, pace: 84, shooting: 52, passing: 70, dribbling: 62, defending: 89, physical: 88, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 23, name: 'Marc-Andre ter Stegen', club: 'Barcelona', position: 'GK', age: 33, ovr: 87, pace: 52, shooting: 25, passing: 80, dribbling: 38, defending: 87, physical: 72, fitness: 85, morale: 'High', status: 'Healthy' },
    { id: 68, name: 'Gavi', club: 'Barcelona', position: 'CM', age: 21, ovr: 86, pace: 76, shooting: 72, passing: 88, dribbling: 89, defending: 77, physical: 69, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 401, name: 'Jules Kounde', club: 'Barcelona', position: 'RB', age: 26, ovr: 85, pace: 82, shooting: 54, passing: 74, dribbling: 72, defending: 86, physical: 76, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 402, name: 'Alejandro Balde', club: 'Barcelona', position: 'LB', age: 21, ovr: 83, pace: 88, shooting: 52, passing: 72, dribbling: 76, defending: 81, physical: 72, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 403, name: 'Pau Cubarsi', club: 'Barcelona', position: 'CB', age: 18, ovr: 82, pace: 76, shooting: 44, passing: 72, dribbling: 64, defending: 84, physical: 76, fitness: 90, morale: 'Very High', status: 'Healthy' },
    { id: 404, name: 'Raphinha', club: 'Barcelona', position: 'LW', age: 28, ovr: 86, pace: 88, shooting: 82, passing: 78, dribbling: 86, defending: 46, physical: 70, fitness: 89, morale: 'Very High', status: 'Healthy' },
    { id: 405, name: 'Dani Olmo', club: 'Barcelona', position: 'CAM', age: 27, ovr: 85, pace: 78, shooting: 80, passing: 84, dribbling: 84, defending: 62, physical: 72, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 406, name: 'Marcus Rashford', club: 'Barcelona', position: 'LW', age: 27, ovr: 83, pace: 90, shooting: 80, passing: 72, dribbling: 84, defending: 42, physical: 76, fitness: 84, morale: 'High', status: 'Healthy' },
    { id: 407, name: 'Marc Casado', club: 'Barcelona', position: 'CDM', age: 21, ovr: 80, pace: 72, shooting: 62, passing: 80, dribbling: 76, defending: 80, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 408, name: 'Fermin Lopez', club: 'Barcelona', position: 'CAM', age: 22, ovr: 79, pace: 76, shooting: 74, passing: 78, dribbling: 80, defending: 58, physical: 68, fitness: 87, morale: 'High', status: 'Healthy' },
  ],
  'Inter Milan': [
    { id: 24, name: 'Lautaro Martinez', club: 'Inter Milan', position: 'ST', age: 27, ovr: 89, pace: 82, shooting: 89, passing: 72, dribbling: 84, defending: 44, physical: 82, fitness: 93, morale: 'Very High', status: 'Healthy' },
    { id: 25, name: 'Nicolo Barella', club: 'Inter Milan', position: 'CM', age: 28, ovr: 88, pace: 78, shooting: 76, passing: 87, dribbling: 85, defending: 81, physical: 83, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 26, name: 'Hakan Calhanoglu', club: 'Inter Milan', position: 'CDM', age: 31, ovr: 86, pace: 72, shooting: 80, passing: 88, dribbling: 82, defending: 76, physical: 74, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 27, name: 'Alessandro Bastoni', club: 'Inter Milan', position: 'CB', age: 26, ovr: 87, pace: 78, shooting: 52, passing: 83, dribbling: 72, defending: 88, physical: 80, fitness: 92, morale: 'High', status: 'Healthy' },
    { id: 28, name: 'Yann Sommer', club: 'Inter Milan', position: 'GK', age: 36, ovr: 84, pace: 48, shooting: 22, passing: 68, dribbling: 32, defending: 85, physical: 70, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 69, name: 'Marcus Thuram', club: 'Inter Milan', position: 'ST', age: 28, ovr: 86, pace: 88, shooting: 83, passing: 70, dribbling: 80, defending: 44, physical: 84, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 405, name: 'Federico Dimarco', club: 'Inter Milan', position: 'LB', age: 27, ovr: 84, pace: 78, shooting: 64, passing: 78, dribbling: 72, defending: 81, physical: 74, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 406, name: 'Denzel Dumfries', club: 'Inter Milan', position: 'RB', age: 29, ovr: 83, pace: 84, shooting: 62, passing: 72, dribbling: 74, defending: 78, physical: 82, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 407, name: 'Manuel Akanji', club: 'Inter Milan', position: 'CB', age: 29, ovr: 84, pace: 78, shooting: 44, passing: 70, dribbling: 62, defending: 86, physical: 82, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 408, name: 'Petar Sucic', club: 'Inter Milan', position: 'CM', age: 22, ovr: 79, pace: 76, shooting: 70, passing: 80, dribbling: 78, defending: 68, physical: 72, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 409, name: 'Luis Henrique', club: 'Inter Milan', position: 'RW', age: 23, ovr: 78, pace: 90, shooting: 72, passing: 68, dribbling: 82, defending: 34, physical: 66, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 410, name: 'Andy Diouf', club: 'Inter Milan', position: 'CM', age: 22, ovr: 78, pace: 78, shooting: 66, passing: 78, dribbling: 76, defending: 70, physical: 74, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 411, name: 'Piotr Zielinski', club: 'Inter Milan', position: 'CM', age: 31, ovr: 83, pace: 70, shooting: 76, passing: 86, dribbling: 82, defending: 66, physical: 70, fitness: 84, morale: 'High', status: 'Healthy' },
    { id: 412, name: 'Nicola Zalewski', club: 'Inter Milan', position: 'LW', age: 23, ovr: 77, pace: 84, shooting: 68, passing: 72, dribbling: 78, defending: 52, physical: 66, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 413, name: 'Francesco Acerbi', club: 'Inter Milan', position: 'CB', age: 37, ovr: 80, pace: 66, shooting: 44, passing: 70, dribbling: 58, defending: 83, physical: 76, fitness: 78, morale: 'Medium', status: 'Healthy' },
  ],
  'AC Milan': [
    { id: 29, name: 'Rafael Leao', club: 'AC Milan', position: 'LW', age: 26, ovr: 87, pace: 94, shooting: 82, passing: 76, dribbling: 90, defending: 34, physical: 74, fitness: 92, morale: 'High', status: 'Healthy' },
    { id: 30, name: 'Christian Pulisic', club: 'AC Milan', position: 'RW', age: 27, ovr: 84, pace: 86, shooting: 80, passing: 78, dribbling: 86, defending: 58, physical: 68, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 31, name: 'Ardon Jashari', club: 'AC Milan', position: 'CM', age: 23, ovr: 81, pace: 76, shooting: 70, passing: 82, dribbling: 78, defending: 76, physical: 76, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 32, name: 'Strahinja Pavlovic', club: 'AC Milan', position: 'CB', age: 24, ovr: 82, pace: 78, shooting: 46, passing: 66, dribbling: 58, defending: 84, physical: 84, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 33, name: 'Mike Maignan', club: 'AC Milan', position: 'GK', age: 30, ovr: 87, pace: 58, shooting: 22, passing: 76, dribbling: 36, defending: 87, physical: 74, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 70, name: 'Pervis Estupinan', club: 'AC Milan', position: 'LB', age: 27, ovr: 82, pace: 88, shooting: 58, passing: 72, dribbling: 74, defending: 78, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 410, name: 'Davide Calabria', club: 'AC Milan', position: 'RB', age: 28, ovr: 80, pace: 76, shooting: 56, passing: 70, dribbling: 68, defending: 80, physical: 74, fitness: 87, morale: 'Medium', status: 'Healthy' },
    { id: 411, name: 'Fikayo Tomori', club: 'AC Milan', position: 'CB', age: 27, ovr: 82, pace: 84, shooting: 44, passing: 66, dribbling: 60, defending: 83, physical: 80, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 412, name: 'Samuele Ricci', club: 'AC Milan', position: 'CDM', age: 24, ovr: 82, pace: 74, shooting: 66, passing: 82, dribbling: 76, defending: 82, physical: 76, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 413, name: 'Niclas Fullkrug', club: 'AC Milan', position: 'ST', age: 32, ovr: 81, pace: 68, shooting: 84, passing: 66, dribbling: 68, defending: 42, physical: 84, fitness: 82, morale: 'High', status: 'Healthy' },
    { id: 414, name: 'Luka Modric', club: 'AC Milan', position: 'CM', age: 40, ovr: 82, pace: 62, shooting: 74, passing: 88, dribbling: 84, defending: 66, physical: 62, fitness: 78, morale: 'High', status: 'Healthy' },
    { id: 415, name: 'Koni De Winter', club: 'AC Milan', position: 'CB', age: 23, ovr: 78, pace: 76, shooting: 42, passing: 64, dribbling: 56, defending: 80, physical: 78, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 416, name: 'Yunus Musah', club: 'AC Milan', position: 'CM', age: 23, ovr: 79, pace: 80, shooting: 66, passing: 76, dribbling: 78, defending: 68, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
   ],
    'Bayern Munich': [
    { id: 34, name: 'Harry Kane', club: 'Bayern Munich', position: 'ST', age: 32, ovr: 90, pace: 76, shooting: 94, passing: 83, dribbling: 80, defending: 46, physical: 83, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 35, name: 'Jamal Musiala', club: 'Bayern Munich', position: 'CAM', age: 22, ovr: 90, pace: 86, shooting: 84, passing: 86, dribbling: 93, defending: 58, physical: 70, fitness: 93, morale: 'Very High', status: 'Healthy' },
    { id: 36, name: 'Luis Diaz', club: 'Bayern Munich', position: 'LW', age: 28, ovr: 86, pace: 92, shooting: 80, passing: 76, dribbling: 88, defending: 46, physical: 72, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 37, name: 'Joshua Kimmich', club: 'Bayern Munich', position: 'CDM', age: 30, ovr: 89, pace: 74, shooting: 74, passing: 90, dribbling: 82, defending: 86, physical: 74, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 38, name: 'Manuel Neuer', club: 'Bayern Munich', position: 'GK', age: 39, ovr: 85, pace: 52, shooting: 22, passing: 82, dribbling: 36, defending: 85, physical: 74, fitness: 82, morale: 'High', status: 'Healthy' },
    { id: 415, name: 'Alphonso Davies', club: 'Bayern Munich', position: 'LB', age: 24, ovr: 86, pace: 97, shooting: 58, passing: 74, dribbling: 80, defending: 77, physical: 72, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 416, name: 'Noussair Mazraoui', club: 'Bayern Munich', position: 'RB', age: 27, ovr: 83, pace: 80, shooting: 58, passing: 72, dribbling: 74, defending: 81, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 417, name: 'Dayot Upamecano', club: 'Bayern Munich', position: 'CB', age: 26, ovr: 85, pace: 82, shooting: 46, passing: 70, dribbling: 64, defending: 87, physical: 84, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 418, name: 'Jonathan Tah', club: 'Bayern Munich', position: 'CB', age: 29, ovr: 84, pace: 78, shooting: 48, passing: 70, dribbling: 62, defending: 86, physical: 82, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 419, name: 'Michael Olise', club: 'Bayern Munich', position: 'RW', age: 23, ovr: 86, pace: 86, shooting: 82, passing: 80, dribbling: 88, defending: 44, physical: 68, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 420, name: 'Leon Goretzka', club: 'Bayern Munich', position: 'CM', age: 30, ovr: 83, pace: 76, shooting: 76, passing: 82, dribbling: 78, defending: 78, physical: 84, fitness: 86, morale: 'Medium', status: 'Healthy' },
    { id: 421, name: 'Min-jae Kim', club: 'Bayern Munich', position: 'CB', age: 28, ovr: 85, pace: 80, shooting: 48, passing: 68, dribbling: 60, defending: 88, physical: 86, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 422, name: 'Thomas Muller', club: 'Bayern Munich', position: 'CAM', age: 36, ovr: 80, pace: 68, shooting: 76, passing: 84, dribbling: 74, defending: 60, physical: 68, fitness: 78, morale: 'High', status: 'Healthy' },
  ],
    'Borussia Dortmund': [
    { id: 39, name: 'Serhou Guirassy', club: 'Borussia Dortmund', position: 'ST', age: 29, ovr: 85, pace: 82, shooting: 87, passing: 64, dribbling: 74, defending: 40, physical: 84, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 40, name: 'Julian Brandt', club: 'Borussia Dortmund', position: 'CAM', age: 29, ovr: 84, pace: 80, shooting: 78, passing: 86, dribbling: 86, defending: 62, physical: 68, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 41, name: 'Emre Can', club: 'Borussia Dortmund', position: 'CDM', age: 31, ovr: 81, pace: 74, shooting: 70, passing: 78, dribbling: 72, defending: 82, physical: 86, fitness: 87, morale: 'Medium', status: 'Healthy' },
    { id: 42, name: 'Nico Schlotterbeck', club: 'Borussia Dortmund', position: 'CB', age: 25, ovr: 83, pace: 78, shooting: 48, passing: 72, dribbling: 62, defending: 85, physical: 82, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 43, name: 'Gregor Kobel', club: 'Borussia Dortmund', position: 'GK', age: 27, ovr: 85, pace: 52, shooting: 22, passing: 72, dribbling: 34, defending: 85, physical: 74, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 421, name: 'Maximilian Beier', club: 'Borussia Dortmund', position: 'ST', age: 22, ovr: 82, pace: 88, shooting: 80, passing: 68, dribbling: 78, defending: 36, physical: 70, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 422, name: 'Jobe Bellingham', club: 'Borussia Dortmund', position: 'CM', age: 20, ovr: 80, pace: 78, shooting: 72, passing: 80, dribbling: 80, defending: 66, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 423, name: 'Waldemar Anton', club: 'Borussia Dortmund', position: 'CB', age: 28, ovr: 82, pace: 76, shooting: 46, passing: 70, dribbling: 60, defending: 84, physical: 82, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 424, name: 'Julian Ryerson', club: 'Borussia Dortmund', position: 'RB', age: 28, ovr: 80, pace: 80, shooting: 58, passing: 72, dribbling: 70, defending: 78, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 425, name: 'Ramy Bensebaini', club: 'Borussia Dortmund', position: 'LB', age: 30, ovr: 79, pace: 78, shooting: 58, passing: 70, dribbling: 68, defending: 78, physical: 74, fitness: 85, morale: 'Medium', status: 'Healthy' },
    { id: 426, name: 'Pascal Sabitzer', club: 'Borussia Dortmund', position: 'CM', age: 31, ovr: 81, pace: 76, shooting: 74, passing: 80, dribbling: 76, defending: 72, physical: 74, fitness: 84, morale: 'High', status: 'Healthy' },
    { id: 427, name: 'Fabio Silva', club: 'Borussia Dortmund', position: 'ST', age: 23, ovr: 78, pace: 76, shooting: 76, passing: 66, dribbling: 72, defending: 38, physical: 76, fitness: 85, morale: 'High', status: 'Healthy' },
    { id: 428, name: 'Aaron Anselmino', club: 'Borussia Dortmund', position: 'CB', age: 20, ovr: 76, pace: 76, shooting: 42, passing: 66, dribbling: 58, defending: 78, physical: 76, fitness: 86, morale: 'High', status: 'Healthy' },
  ],
    'PSG': [
    { id: 45, name: 'Ousmane Dembele', club: 'PSG', position: 'RW', age: 28, ovr: 87, pace: 94, shooting: 83, passing: 79, dribbling: 91, defending: 37, physical: 69, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 46, name: 'Fabian Ruiz', club: 'PSG', position: 'CM', age: 29, ovr: 84, pace: 72, shooting: 78, passing: 87, dribbling: 82, defending: 72, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 47, name: 'Marquinhos', club: 'PSG', position: 'CB', age: 31, ovr: 86, pace: 76, shooting: 52, passing: 78, dribbling: 68, defending: 88, physical: 80, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 48, name: 'Matvey Safonov', club: 'PSG', position: 'GK', age: 25, ovr: 82, pace: 54, shooting: 22, passing: 68, dribbling: 34, defending: 82, physical: 74, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 427, name: 'Bradley Barcola', club: 'PSG', position: 'LW', age: 23, ovr: 84, pace: 93, shooting: 78, passing: 74, dribbling: 88, defending: 37, physical: 67, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 428, name: 'Vitinha', club: 'PSG', position: 'CM', age: 25, ovr: 85, pace: 74, shooting: 72, passing: 87, dribbling: 85, defending: 69, physical: 69, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 429, name: 'Warren Zaire-Emery', club: 'PSG', position: 'CM', age: 19, ovr: 82, pace: 79, shooting: 69, passing: 82, dribbling: 82, defending: 67, physical: 69, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 430, name: 'Achraf Hakimi', club: 'PSG', position: 'RB', age: 27, ovr: 87, pace: 93, shooting: 68, passing: 79, dribbling: 83, defending: 81, physical: 79, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 431, name: 'Nuno Mendes', club: 'PSG', position: 'LB', age: 23, ovr: 84, pace: 88, shooting: 54, passing: 73, dribbling: 77, defending: 79, physical: 73, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 432, name: 'Willian Pacho', club: 'PSG', position: 'CB', age: 23, ovr: 83, pace: 80, shooting: 44, passing: 70, dribbling: 62, defending: 85, physical: 82, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 433, name: 'Goncalo Ramos', club: 'PSG', position: 'ST', age: 24, ovr: 83, pace: 78, shooting: 83, passing: 68, dribbling: 75, defending: 38, physical: 75, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 434, name: 'Joao Neves', club: 'PSG', position: 'CDM', age: 20, ovr: 84, pace: 76, shooting: 68, passing: 84, dribbling: 80, defending: 82, physical: 74, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 435, name: 'Desire Doue', club: 'PSG', position: 'LW', age: 20, ovr: 81, pace: 88, shooting: 76, passing: 74, dribbling: 86, defending: 36, physical: 66, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 436, name: 'Lee Kang-in', club: 'PSG', position: 'CAM', age: 24, ovr: 82, pace: 76, shooting: 78, passing: 82, dribbling: 86, defending: 52, physical: 64, fitness: 87, morale: 'High', status: 'Healthy' },
  ],
    'Benfica': [
    { id: 49, name: 'Vangelis Pavlidis', club: 'Benfica', position: 'ST', age: 27, ovr: 83, pace: 80, shooting: 85, passing: 66, dribbling: 74, defending: 38, physical: 78, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 50, name: 'Fredrik Aursnes', club: 'Benfica', position: 'CM', age: 29, ovr: 80, pace: 76, shooting: 68, passing: 80, dribbling: 76, defending: 80, physical: 78, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 51, name: 'Antonio Silva', club: 'Benfica', position: 'CB', age: 22, ovr: 83, pace: 76, shooting: 46, passing: 70, dribbling: 60, defending: 85, physical: 80, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 52, name: 'Anatoliy Trubin', club: 'Benfica', position: 'GK', age: 23, ovr: 83, pace: 52, shooting: 22, passing: 70, dribbling: 32, defending: 83, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 434, name: 'Dodi Lukebakio', club: 'Benfica', position: 'RW', age: 27, ovr: 81, pace: 90, shooting: 76, passing: 70, dribbling: 82, defending: 38, physical: 70, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 435, name: 'Richard Rios', club: 'Benfica', position: 'CDM', age: 25, ovr: 81, pace: 74, shooting: 62, passing: 80, dribbling: 74, defending: 82, physical: 78, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 436, name: 'David Neres', club: 'Benfica', position: 'LW', age: 28, ovr: 81, pace: 88, shooting: 74, passing: 72, dribbling: 86, defending: 36, physical: 64, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 437, name: 'Nicolas Otamendi', club: 'Benfica', position: 'CB', age: 37, ovr: 78, pace: 64, shooting: 48, passing: 66, dribbling: 56, defending: 82, physical: 80, fitness: 78, morale: 'Medium', status: 'Healthy' },
    { id: 438, name: 'Samuel Dahl', club: 'Benfica', position: 'LB', age: 24, ovr: 78, pace: 84, shooting: 50, passing: 70, dribbling: 70, defending: 76, physical: 70, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 439, name: 'Alexander Bah', club: 'Benfica', position: 'RB', age: 27, ovr: 77, pace: 80, shooting: 52, passing: 66, dribbling: 68, defending: 74, physical: 72, fitness: 85, morale: 'Medium', status: 'Healthy' },
    { id: 440, name: 'Georgiy Sudakov', club: 'Benfica', position: 'CAM', age: 23, ovr: 83, pace: 76, shooting: 78, passing: 84, dribbling: 84, defending: 58, physical: 68, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 441, name: 'Franjo Ivanovic', club: 'Benfica', position: 'ST', age: 23, ovr: 79, pace: 80, shooting: 78, passing: 62, dribbling: 72, defending: 36, physical: 74, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 442, name: 'Jan-Niklas Beste', club: 'Benfica', position: 'LW', age: 26, ovr: 79, pace: 82, shooting: 72, passing: 74, dribbling: 78, defending: 42, physical: 66, fitness: 86, morale: 'High', status: 'Healthy' },
  ],
    'Porto': [
    { id: 53, name: 'Gabri Veiga', club: 'Porto', position: 'CAM', age: 23, ovr: 82, pace: 74, shooting: 78, passing: 84, dribbling: 84, defending: 60, physical: 70, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 54, name: 'Alan Varela', club: 'Porto', position: 'CDM', age: 24, ovr: 80, pace: 72, shooting: 62, passing: 78, dribbling: 72, defending: 80, physical: 76, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 55, name: 'Pepe', club: 'Porto', position: 'CB', age: 42, ovr: 76, pace: 58, shooting: 48, passing: 66, dribbling: 54, defending: 82, physical: 80, fitness: 72, morale: 'High', status: 'Healthy' },
    { id: 56, name: 'Diogo Costa', club: 'Porto', position: 'GK', age: 26, ovr: 86, pace: 54, shooting: 22, passing: 78, dribbling: 36, defending: 86, physical: 72, fitness: 91, morale: 'High', status: 'Healthy' },
    { id: 441, name: 'Galeno', club: 'Porto', position: 'LW', age: 27, ovr: 81, pace: 90, shooting: 74, passing: 68, dribbling: 84, defending: 36, physical: 68, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 442, name: 'Jakub Kiwior', club: 'Porto', position: 'CB', age: 25, ovr: 80, pace: 74, shooting: 44, passing: 70, dribbling: 60, defending: 82, physical: 78, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 443, name: 'Wendell', club: 'Porto', position: 'LB', age: 31, ovr: 76, pace: 78, shooting: 52, passing: 70, dribbling: 68, defending: 75, physical: 72, fitness: 83, morale: 'Medium', status: 'Healthy' },
    { id: 444, name: 'Joao Mario', club: 'Porto', position: 'RB', age: 32, ovr: 76, pace: 74, shooting: 56, passing: 72, dribbling: 68, defending: 75, physical: 70, fitness: 82, morale: 'Medium', status: 'Healthy' },
    { id: 445, name: 'David Carmo', club: 'Porto', position: 'CB', age: 25, ovr: 78, pace: 72, shooting: 44, passing: 66, dribbling: 56, defending: 81, physical: 78, fitness: 86, morale: 'Medium', status: 'Healthy' },
    { id: 446, name: 'Evanilson', club: 'Porto', position: 'ST', age: 25, ovr: 80, pace: 82, shooting: 80, passing: 60, dribbling: 74, defending: 36, physical: 76, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 447, name: 'Danny Namaso', club: 'Porto', position: 'RW', age: 23, ovr: 78, pace: 90, shooting: 72, passing: 64, dribbling: 78, defending: 32, physical: 68, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 448, name: 'Rodrigo Mora', club: 'Porto', position: 'ST', age: 19, ovr: 77, pace: 84, shooting: 76, passing: 66, dribbling: 78, defending: 34, physical: 68, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 449, name: 'Ivan Jaime', club: 'Porto', position: 'CM', age: 23, ovr: 76, pace: 72, shooting: 66, passing: 76, dribbling: 76, defending: 60, physical: 66, fitness: 85, morale: 'High', status: 'Healthy' },
  ],
  'PSV': [
    { id: 58, name: 'Noa Lang', club: 'PSV', position: 'LW', age: 26, ovr: 83, pace: 86, shooting: 78, passing: 76, dribbling: 88, defending: 36, physical: 66, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 57, name: 'Ricardo Pepi', club: 'PSV', position: 'ST', age: 22, ovr: 80, pace: 78, shooting: 80, passing: 62, dribbling: 70, defending: 38, physical: 76, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 59, name: 'Olivier Boscagli', club: 'PSV', position: 'CB', age: 28, ovr: 80, pace: 76, shooting: 48, passing: 72, dribbling: 64, defending: 83, physical: 76, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 60, name: 'Walter Benitez', club: 'PSV', position: 'GK', age: 33, ovr: 81, pace: 50, shooting: 22, passing: 68, dribbling: 32, defending: 82, physical: 70, fitness: 85, morale: 'High', status: 'Healthy' },
    { id: 450, name: 'Johan Bakayoko', club: 'PSV', position: 'RW', age: 22, ovr: 81, pace: 93, shooting: 74, passing: 70, dribbling: 86, defending: 34, physical: 65, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 451, name: 'Guus Til', club: 'PSV', position: 'CM', age: 28, ovr: 79, pace: 72, shooting: 72, passing: 78, dribbling: 74, defending: 68, physical: 74, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 452, name: 'Jordan Teze', club: 'PSV', position: 'RB', age: 25, ovr: 78, pace: 78, shooting: 52, passing: 68, dribbling: 68, defending: 77, physical: 72, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 453, name: 'Fredrik Oppegard', club: 'PSV', position: 'LB', age: 23, ovr: 76, pace: 80, shooting: 50, passing: 70, dribbling: 68, defending: 74, physical: 70, fitness: 85, morale: 'High', status: 'Healthy' },
    { id: 454, name: 'Jerdy Schouten', club: 'PSV', position: 'CDM', age: 28, ovr: 82, pace: 70, shooting: 66, passing: 82, dribbling: 74, defending: 82, physical: 76, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 455, name: 'Malik Tillman', club: 'PSV', position: 'CAM', age: 23, ovr: 80, pace: 78, shooting: 74, passing: 78, dribbling: 80, defending: 54, physical: 68, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 456, name: 'Ryan Flamingo', club: 'PSV', position: 'CB', age: 22, ovr: 78, pace: 78, shooting: 44, passing: 68, dribbling: 60, defending: 80, physical: 76, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 457, name: 'Luuk de Jong', club: 'PSV', position: 'ST', age: 35, ovr: 78, pace: 68, shooting: 80, passing: 64, dribbling: 66, defending: 42, physical: 80, fitness: 80, morale: 'High', status: 'Healthy' },
    { id: 458, name: 'Sven Mijnans', club: 'PSV', position: 'CM', age: 25, ovr: 78, pace: 74, shooting: 68, passing: 80, dribbling: 76, defending: 66, physical: 70, fitness: 86, morale: 'High', status: 'Healthy' },
  ],
  'Feyenoord': [
    { id: 61, name: 'Ayase Ueda', club: 'Feyenoord', position: 'ST', age: 27, ovr: 80, pace: 80, shooting: 82, passing: 62, dribbling: 72, defending: 36, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 62, name: 'Quinten Timber', club: 'Feyenoord', position: 'CM', age: 23, ovr: 79, pace: 78, shooting: 70, passing: 80, dribbling: 78, defending: 74, physical: 74, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 63, name: 'Anel Ahmedhodzic', club: 'Feyenoord', position: 'CB', age: 25, ovr: 81, pace: 78, shooting: 48, passing: 70, dribbling: 62, defending: 83, physical: 82, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 64, name: 'Timon Wellenreuther', club: 'Feyenoord', position: 'GK', age: 29, ovr: 80, pace: 50, shooting: 22, passing: 66, dribbling: 32, defending: 80, physical: 70, fitness: 85, morale: 'High', status: 'Healthy' },
    { id: 459, name: 'Goncalo Borges', club: 'Feyenoord', position: 'RW', age: 25, ovr: 80, pace: 86, shooting: 74, passing: 70, dribbling: 82, defending: 36, physical: 64, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 460, name: 'Mats Wieffer', club: 'Feyenoord', position: 'CDM', age: 25, ovr: 80, pace: 72, shooting: 62, passing: 78, dribbling: 72, defending: 80, physical: 76, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 461, name: 'Quilindschy Hartman', club: 'Feyenoord', position: 'LB', age: 23, ovr: 76, pace: 80, shooting: 48, passing: 66, dribbling: 66, defending: 73, physical: 68, fitness: 85, morale: 'High', status: 'Healthy' },
    { id: 462, name: 'Marcus Pedersen', club: 'Feyenoord', position: 'RB', age: 28, ovr: 76, pace: 78, shooting: 50, passing: 66, dribbling: 64, defending: 73, physical: 70, fitness: 84, morale: 'Medium', status: 'Healthy' },
    { id: 463, name: 'David Hancko', club: 'Feyenoord', position: 'CB', age: 27, ovr: 80, pace: 80, shooting: 48, passing: 70, dribbling: 62, defending: 83, physical: 78, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 464, name: 'Igor Paixao', club: 'Feyenoord', position: 'LW', age: 25, ovr: 79, pace: 86, shooting: 72, passing: 68, dribbling: 82, defending: 36, physical: 64, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 465, name: 'Casper Tengstedt', club: 'Feyenoord', position: 'ST', age: 24, ovr: 78, pace: 76, shooting: 78, passing: 60, dribbling: 68, defending: 36, physical: 76, fitness: 85, morale: 'High', status: 'Healthy' },
    { id: 466, name: 'Hwang In-beom', club: 'Feyenoord', position: 'CM', age: 29, ovr: 78, pace: 72, shooting: 68, passing: 78, dribbling: 74, defending: 70, physical: 72, fitness: 84, morale: 'High', status: 'Healthy' },
    { id: 467, name: 'Luka Ivanusec', club: 'Feyenoord', position: 'CAM', age: 26, ovr: 77, pace: 74, shooting: 70, passing: 78, dribbling: 76, defending: 54, physical: 66, fitness: 84, morale: 'High', status: 'Healthy' },
  ],
  'Monaco': [
    { id: 501, name: 'George Ilenikhena', club: 'Monaco', position: 'ST', age: 18, ovr: 80, pace: 88, shooting: 78, passing: 62, dribbling: 78, defending: 36, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 502, name: 'Takumi Minamino', club: 'Monaco', position: 'CAM', age: 30, ovr: 80, pace: 82, shooting: 76, passing: 78, dribbling: 80, defending: 56, physical: 68, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 503, name: 'Youssouf Fofana', club: 'Monaco', position: 'CDM', age: 26, ovr: 84, pace: 78, shooting: 64, passing: 80, dribbling: 76, defending: 84, physical: 82, fitness: 90, morale: 'High', status: 'Healthy' },
    { id: 504, name: 'Denis Zakaria', club: 'Monaco', position: 'CDM', age: 29, ovr: 80, pace: 74, shooting: 60, passing: 76, dribbling: 72, defending: 82, physical: 84, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 505, name: 'Wilfried Singo', club: 'Monaco', position: 'RB', age: 24, ovr: 80, pace: 88, shooting: 56, passing: 66, dribbling: 72, defending: 78, physical: 80, fitness: 88, morale: 'High', status: 'Healthy' },
    { id: 506, name: 'Radoslaw Majecki', club: 'Monaco', position: 'GK', age: 25, ovr: 79, pace: 50, shooting: 22, passing: 64, dribbling: 30, defending: 79, physical: 70, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 507, name: 'Breel Embolo', club: 'Monaco', position: 'ST', age: 28, ovr: 80, pace: 84, shooting: 76, passing: 64, dribbling: 74, defending: 40, physical: 80, fitness: 84, morale: 'High', status: 'Healthy' },
    { id: 508, name: 'Caio Henrique', club: 'Monaco', position: 'LB', age: 27, ovr: 80, pace: 82, shooting: 52, passing: 72, dribbling: 72, defending: 76, physical: 70, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 509, name: 'Vanderson', club: 'Monaco', position: 'RB', age: 23, ovr: 79, pace: 88, shooting: 50, passing: 68, dribbling: 74, defending: 74, physical: 70, fitness: 89, morale: 'High', status: 'Healthy' },
    { id: 510, name: 'Mamadou Coulibaly', club: 'Monaco', position: 'CB', age: 23, ovr: 77, pace: 76, shooting: 42, passing: 64, dribbling: 56, defending: 79, physical: 78, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 511, name: 'Maghnes Akliouche', club: 'Monaco', position: 'RW', age: 23, ovr: 81, pace: 84, shooting: 76, passing: 76, dribbling: 84, defending: 38, physical: 64, fitness: 87, morale: 'High', status: 'Healthy' },
    { id: 512, name: 'Eliesse Ben Seghir', club: 'Monaco', position: 'CAM', age: 20, ovr: 79, pace: 80, shooting: 74, passing: 78, dribbling: 82, defending: 44, physical: 62, fitness: 86, morale: 'High', status: 'Healthy' },
    { id: 513, name: 'Folarin Balogun', club: 'Monaco', position: 'ST', age: 24, ovr: 79, pace: 82, shooting: 78, passing: 64, dribbling: 74, defending: 36, physical: 72, fitness: 85, morale: 'High', status: 'Healthy' },
  ],
}
const getDefaultSquad = (teamName: string) => [
  { id: 201, name: 'Player GK', club: teamName, position: 'GK', age: 28, ovr: 80, pace: 52, shooting: 25, passing: 68, dribbling: 35, defending: 82, physical: 74, fitness: 90, morale: 'High', status: 'Healthy' },
  { id: 202, name: 'Player RB', club: teamName, position: 'RB', age: 26, ovr: 78, pace: 78, shooting: 55, passing: 70, dribbling: 68, defending: 78, physical: 74, fitness: 88, morale: 'High', status: 'Healthy' },
  { id: 203, name: 'Player CB 1', club: teamName, position: 'CB', age: 27, ovr: 80, pace: 72, shooting: 44, passing: 66, dribbling: 58, defending: 82, physical: 80, fitness: 91, morale: 'High', status: 'Healthy' },
  { id: 204, name: 'Player CB 2', club: teamName, position: 'CB', age: 29, ovr: 79, pace: 70, shooting: 42, passing: 64, dribbling: 56, defending: 80, physical: 78, fitness: 89, morale: 'Medium', status: 'Healthy' },
  { id: 205, name: 'Player LB', club: teamName, position: 'LB', age: 25, ovr: 77, pace: 76, shooting: 52, passing: 68, dribbling: 66, defending: 76, physical: 72, fitness: 87, morale: 'High', status: 'Healthy' },
  { id: 206, name: 'Player CDM', club: teamName, position: 'CDM', age: 28, ovr: 79, pace: 70, shooting: 65, passing: 78, dribbling: 72, defending: 80, physical: 80, fitness: 90, morale: 'High', status: 'Healthy' },
  { id: 207, name: 'Player CM 1', club: teamName, position: 'CM', age: 26, ovr: 78, pace: 72, shooting: 70, passing: 80, dribbling: 76, defending: 70, physical: 72, fitness: 88, morale: 'High', status: 'Healthy' },
  { id: 208, name: 'Player CM 2', club: teamName, position: 'CM', age: 24, ovr: 76, pace: 74, shooting: 68, passing: 78, dribbling: 74, defending: 68, physical: 70, fitness: 86, morale: 'Medium', status: 'Healthy' },
  { id: 209, name: 'Player RW', club: teamName, position: 'RW', age: 23, ovr: 78, pace: 86, shooting: 74, passing: 70, dribbling: 82, defending: 38, physical: 66, fitness: 89, morale: 'High', status: 'Healthy' },
  { id: 210, name: 'Player LW', club: teamName, position: 'LW', age: 24, ovr: 77, pace: 84, shooting: 72, passing: 68, dribbling: 80, defending: 36, physical: 64, fitness: 87, morale: 'High', status: 'Healthy' },
  { id: 211, name: 'Player ST', club: teamName, position: 'ST', age: 27, ovr: 81, pace: 80, shooting: 82, passing: 66, dribbling: 76, defending: 40, physical: 78, fitness: 92, morale: 'High', status: 'Healthy' },
]

const TEAM_BUDGETS: Record<string, number> = {
  'Manchester City': 150000000,
  'Arsenal': 120000000,
  'Real Madrid': 200000000,
  'Barcelona': 130000000,
  'Inter Milan': 100000000,
  'AC Milan': 95000000,
  'Bayern Munich': 140000000,
  'Borussia Dortmund': 80000000,
  'PSG': 180000000,
  'Benfica': 60000000,
  'Porto': 65000000,
  'PSV': 70000000,
  'Feyenoord': 55000000,
  'Monaco': 90000000,
}

const TEAM_OVRS: Record<string, number> = {
  'Manchester City': 89,
  'Arsenal': 86,
  'Real Madrid': 91,
  'Barcelona': 87,
  'Inter Milan': 86,
  'AC Milan': 84,
  'Bayern Munich': 88,
  'Borussia Dortmund': 82,
  'PSG': 87,
  'Benfica': 80,
  'Porto': 81,
  'PSV': 82,
  'Feyenoord': 79,
  'Monaco': 81,
}

// AI teams to fill CL groups
const AI_CL_TEAMS = [
  { name: 'Atletico Madrid', ovr: 85 },
  { name: 'Juventus', ovr: 83 },
  { name: 'Liverpool', ovr: 87 },
  { name: 'Chelsea', ovr: 84 },
]

function generateCLGroups(humanTeams: string[]): { team: string, group: string }[] {
  const allTeams = [
    ...humanTeams.map(t => ({ name: t, isHuman: true })),
    ...AI_CL_TEAMS.map(t => ({ name: t.name, isHuman: false }))
  ]

  // Shuffle and assign to groups
  const shuffled = [...allTeams].sort(() => Math.random() - 0.5)
  const groups = ['A', 'B', 'C', 'D']
  const teamsPerGroup = Math.ceil(shuffled.length / 4)

  return shuffled.map((team, idx) => ({
    team: team.name,
    group: groups[Math.floor(idx / teamsPerGroup)]
  }))
}

function generateCLGroupMatches(groupAssignments: { team: string, group: string }[]): any[] {
  const matches: any[] = []
  const groups = ['A', 'B', 'C', 'D']

  groups.forEach(group => {
    const groupTeams = groupAssignments.filter(g => g.group === group).map(g => g.team)
    for (let i = 0; i < groupTeams.length; i++) {
      for (let j = i + 1; j < groupTeams.length; j++) {
        matches.push({
          home: groupTeams[i],
          away: groupTeams[j],
          homeScore: undefined,
          awayScore: undefined,
          played: false,
          round: 'group',
          group
        })
        matches.push({
          home: groupTeams[j],
          away: groupTeams[i],
          homeScore: undefined,
          awayScore: undefined,
          played: false,
          round: 'group',
          group
        })
      }
    }
  })

  return matches
}

function simulateAIMatch(homeOvr: number, awayOvr: number): { homeScore: number, awayScore: number } {
  const homeAdv = 1.1
  const homeStrength = (homeOvr * homeAdv) / awayOvr
  const awayStrength = awayOvr / (homeOvr * homeAdv)

  let homeScore = 0
  let awayScore = 0

  for (let min = 1; min <= 90; min++) {
    if (Math.random() < 0.08 * homeStrength) {
      if (Math.random() < 0.45) {
        if (Math.random() < 0.35) homeScore++
      }
    }
    if (Math.random() < 0.08 * awayStrength) {
      if (Math.random() < 0.45) {
        if (Math.random() < 0.35) awayScore++
      }
    }
  }

  return { homeScore, awayScore }
}

function App() {
  const [screen, setScreen] = useState<'lobby' | 'draft' | 'squad' | 'transfer' | 'league' | 'match' | 'endofseason' | 'midtransfer' | 'cl'>('lobby')
  const [playerName, setPlayerName] = useState('')
  const [selectedTeam, setSelectedTeam] = useState('')
  const [mySquad, setMySquad] = useState<any[]>([])
  const [draftSelections, setDraftSelections] = useState<Record<string, string>>({})
  const [allTeams, setAllTeams] = useState<string[]>([])
  const [currentMatch, setCurrentMatch] = useState<{ home: string, away: string, round: string } | null>(null)
  const [leagueResults, setLeagueResults] = useState<any[]>([])
  const [midSeasonWindowUsed, setMidSeasonWindowUsed] = useState(false)
  const [clMatches, setCLMatches] = useState<any[]>([])
  const [clGroupAssignments, setCLGroupAssignments] = useState<{ team: string, group: string }[]>([])
  const [currentContext, setCurrentContext] = useState<'league' | 'cl'>('league')

  const handleCreateGame = (name: string) => {
    setPlayerName(name)
    setScreen('draft')
  }

  const handleDraftComplete = (selections: Record<string, string>) => {
    setDraftSelections(selections)
    const myTeam = selections[playerName]
    setSelectedTeam(myTeam)
    const teams = Object.values(selections)
    setAllTeams(teams)
    const squad = TEAM_PLAYERS[myTeam] || getDefaultSquad(myTeam)
    setMySquad(squad)

    // Set up Champions League
    const groupAssignments = generateCLGroups(teams)
    setCLGroupAssignments(groupAssignments)
    const clGroupMatches = generateCLGroupMatches(groupAssignments)
    setCLMatches(clGroupMatches)

    setScreen('squad')
  }

  const handleSquadConfirmed = () => {
    setScreen('transfer')
  }

  const handlePurchase = (player: any) => {
    const newPlayer = { ...player, fitness: 85, morale: 'High', status: 'Healthy' }
    setMySquad(prev => [...prev, newPlayer])
  }

  const handleTransferComplete = () => {
    setScreen('league')
  }

  const handlePlayNextMatch = () => {
    setMySquad(prev => prev.map(player => {
      const recovery = Math.random() * 10 + 5
      const newFitness = Math.min(99, player.fitness + recovery)
      return { ...player, fitness: Math.round(newFitness) }
    }))

    const fixtures = generateFixtures(allTeams)
    const playedKeys = leagueResults.map(r => `${r.homeTeam}-${r.awayTeam}`)
    const nextFixture = fixtures.find(f => !playedKeys.includes(`${f.home}-${f.away}`))
    if (nextFixture) {
      setCurrentMatch({ home: nextFixture.home, away: nextFixture.away, round: 'league' })
      setCurrentContext('league')
      setScreen('match')
    }
  }

  const handlePlayCLMatch = (home: string, away: string, round: string) => {
    setCurrentMatch({ home, away, round })
    setCurrentContext('cl')
    setScreen('match')
  }

  const generateFixtures = (teams: string[]) => {
    const fixtures: { home: string, away: string }[] = []
    for (let i = 0; i < teams.length; i++) {
      for (let j = i + 1; j < teams.length; j++) {
        fixtures.push({ home: teams[i], away: teams[j] })
        fixtures.push({ home: teams[j], away: teams[i] })
      }
    }
    return fixtures
  }

  const advanceCLKnockouts = (updatedMatches: any[]) => {
    const groups = ['A', 'B', 'C', 'D']
    const groupStage = updatedMatches.filter(m => m.round === 'group')
    const allGroupsComplete = groups.every(group => {
      const gMatches = groupStage.filter(m => m.group === group)
      return gMatches.every(m => m.played)
    })

    if (!allGroupsComplete) return updatedMatches

    const r16Exists = updatedMatches.some(m => m.round === 'r16')
    if (r16Exists) {
      // Check if R16 complete, generate QF
      const r16 = updatedMatches.filter(m => m.round === 'r16')
      if (r16.every(m => m.played) && !updatedMatches.some(m => m.round === 'qf')) {
        const winners = r16.map(m =>
          (m.homeScore || 0) >= (m.awayScore || 0) ? m.home : m.away
        )
        const qfMatches = []
        for (let i = 0; i < winners.length; i += 2) {
          if (winners[i + 1]) {
            qfMatches.push({ home: winners[i], away: winners[i + 1], played: false, round: 'qf' })
          }
        }
        return [...updatedMatches, ...qfMatches]
      }

      // Check if QF complete, generate SF
      const qf = updatedMatches.filter(m => m.round === 'qf')
      if (qf.length > 0 && qf.every(m => m.played) && !updatedMatches.some(m => m.round === 'sf')) {
        const winners = qf.map(m =>
          (m.homeScore || 0) >= (m.awayScore || 0) ? m.home : m.away
        )
        const sfMatches = []
        for (let i = 0; i < winners.length; i += 2) {
          if (winners[i + 1]) {
            sfMatches.push({ home: winners[i], away: winners[i + 1], played: false, round: 'sf' })
          }
        }
        return [...updatedMatches, ...sfMatches]
      }

      // Check if SF complete, generate Final
      const sf = updatedMatches.filter(m => m.round === 'sf')
      if (sf.length > 0 && sf.every(m => m.played) && !updatedMatches.some(m => m.round === 'final')) {
        const winners = sf.map(m =>
          (m.homeScore || 0) >= (m.awayScore || 0) ? m.home : m.away
        )
        return [...updatedMatches, { home: winners[0], away: winners[1], played: false, round: 'final' }]
      }

      return updatedMatches
    }

    // Generate R16 from group winners and runners-up
    const groupAdvancers: string[] = []
    groups.forEach(group => {
      const gTeams = clGroupAssignments.filter(g => g.group === group).map(g => g.team)
      const standings = gTeams.map(team => {
        const homeGames = groupStage.filter(m => m.home === team && m.group === group && m.played)
        const awayGames = groupStage.filter(m => m.away === team && m.group === group && m.played)
        let pts = 0
        homeGames.forEach((m: any) => {
          if ((m.homeScore || 0) > (m.awayScore || 0)) pts += 3
          else if (m.homeScore === m.awayScore) pts += 1
        })
        awayGames.forEach((m: any) => {
          if ((m.awayScore || 0) > (m.homeScore || 0)) pts += 3
          else if (m.awayScore === m.homeScore) pts += 1
        })
        return { team, pts }
      }).sort((a, b) => b.pts - a.pts)

      if (standings[0]) groupAdvancers.push(standings[0].team)
      if (standings[1]) groupAdvancers.push(standings[1].team)
    })

    const r16Matches = []
    for (let i = 0; i < groupAdvancers.length; i += 2) {
      if (groupAdvancers[i + 1]) {
        r16Matches.push({
          home: groupAdvancers[i],
          away: groupAdvancers[i + 1],
          played: false,
          round: 'r16'
        })
      }
    }

    return [...updatedMatches, ...r16Matches]
  }

  const handleMatchComplete = (result: any) => {
    if (currentMatch) {
      if (currentContext === 'league') {
        const newResult = {
          homeTeam: currentMatch.home,
          awayTeam: currentMatch.away,
          homeScore: result.homeScore,
          awayScore: result.awayScore,
          played: true
        }

        const updatedResults = [...leagueResults, newResult]
        setLeagueResults(updatedResults)

        if (currentMatch.home === selectedTeam || currentMatch.away === selectedTeam) {
          setMySquad(prev => prev.map(player => {
            const fitnessChange = Math.random() * 15 + 10
            const newFitness = Math.max(40, player.fitness - fitnessChange)
            return { ...player, fitness: Math.round(newFitness) }
          }))
        }

        const totalFixtures = generateFixtures(allTeams).length
        const halfwayPoint = Math.floor(totalFixtures / 2)
        if (updatedResults.length === halfwayPoint && !midSeasonWindowUsed) {
          setScreen('midtransfer')
          return
        }

        setScreen('league')
      } else {
        // CL match
        const updatedCLMatches = clMatches.map(m => {
          if (m.home === currentMatch.home && m.away === currentMatch.away && m.round === currentMatch.round && !m.played) {
            return { ...m, homeScore: result.homeScore, awayScore: result.awayScore, played: true }
          }
          return m
        })

        // Auto-simulate AI matches in same round
        const currentRoundMatches = updatedCLMatches.filter(m => m.round === currentMatch.round)
        const aiSimulated = updatedCLMatches.map(m => {
          if (m.round === currentMatch.round && !m.played &&
              m.home !== selectedTeam && m.away !== selectedTeam) {
            const homeOvr = TEAM_OVRS[m.home] || 82
            const awayOvr = TEAM_OVRS[m.away] || 82
            const aiResult = simulateAIMatch(homeOvr, awayOvr)
            return { ...m, homeScore: aiResult.homeScore, awayScore: aiResult.awayScore, played: true }
          }
          return m
        })

        const withKnockouts = advanceCLKnockouts(aiSimulated)
        setCLMatches(withKnockouts)
        setScreen('cl')
      }
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {screen === 'lobby' && (
        <LobbyScreen onCreateGame={handleCreateGame} />
      )}
      {screen === 'draft' && (
        <DraftScreen
          players={[playerName, 'Player 2', 'Player 3', 'Player 4']}
          onDraftComplete={handleDraftComplete}
        />
      )}
      {screen === 'squad' && (
        <SquadScreen
          teamName={selectedTeam}
          players={mySquad}
          onContinue={handleSquadConfirmed}
          onBack={leagueResults.length > 0 ? () => setScreen('league') : undefined}
        />
      )}
      {screen === 'transfer' && (
        <TransferMarketScreen
          budget={TEAM_BUDGETS[selectedTeam] || 80000000}
          myTeam={selectedTeam}
          onPurchase={handlePurchase}
          onContinue={handleTransferComplete}
          timeLeft={600}
        />
      )}
      {/* Navigation Bar - only show during season */}
      {['league', 'cl', 'squad'].includes(screen) && allTeams.length > 0 && (        <NavBar
          currentScreen={screen}
          playerTeam={selectedTeam}
          onGoLeague={() => setScreen('league')}
          onGoCL={() => setScreen('cl')}
          onGoSquad={() => setScreen('squad')}
          onGoTransfer={() => setScreen('midtransfer')}
        />
      )}
      {screen === 'league' && (
        <LeagueScreen
          teams={allTeams}
          playerTeam={selectedTeam}
          results={leagueResults}
          onPlayNextMatch={handlePlayNextMatch}
          onViewComplete={() => setScreen('endofseason')}
          onViewSquad={() => setScreen('squad')}
          onViewCL={() => setScreen('cl')}
        />
      )}
      {screen === 'cl' && (
        <ChampionsLeagueScreen
          teams={[
            ...allTeams.map(t => ({ name: t, ovr: TEAM_OVRS[t] || 82 })),
            ...AI_CL_TEAMS
          ]}
          playerTeam={selectedTeam}
          onPlayMatch={handlePlayCLMatch}
          onMatchResult={() => {}}
          matches={clMatches}
          onComplete={() => setScreen('league')}
        />
      )}
      {screen === 'match' && currentMatch && (
        <MatchScreen
          homeTeam={currentMatch.home}
          awayTeam={currentMatch.away}
          homeOvr={TEAM_OVRS[currentMatch.home] || 82}
          awayOvr={TEAM_OVRS[currentMatch.away] || 82}
          homePlayers={(TEAM_PLAYERS[currentMatch.home] || getDefaultSquad(currentMatch.home)).map(p => ({ name: p.name, position: p.position, ovr: p.ovr }))}
          awayPlayers={(TEAM_PLAYERS[currentMatch.away] || getDefaultSquad(currentMatch.away)).map(p => ({ name: p.name, position: p.position, ovr: p.ovr }))}
          onMatchComplete={handleMatchComplete}
        />
      )}
      {screen === 'midtransfer' && (
        <TransferMarketScreen
          budget={TEAM_BUDGETS[selectedTeam] || 80000000}
          myTeam={selectedTeam}
          onPurchase={handlePurchase}
          onContinue={() => {
            setMidSeasonWindowUsed(true)
            setScreen('league')
          }}
          timeLeft={300}
          isMidSeason={true}
        />
      )}
     {screen === 'endofseason' && (
        <EndOfSeasonScreen
          standings={allTeams.map(name => {
            const homeGames = leagueResults.filter(r => r.homeTeam === name)
            const awayGames = leagueResults.filter(r => r.awayTeam === name)
            let won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0
            homeGames.forEach(r => {
              goalsFor += r.homeScore; goalsAgainst += r.awayScore
              if (r.homeScore > r.awayScore) won++
              else if (r.homeScore === r.awayScore) drawn++
              else lost++
            })
            awayGames.forEach(r => {
              goalsFor += r.awayScore; goalsAgainst += r.homeScore
              if (r.awayScore > r.homeScore) won++
              else if (r.awayScore === r.homeScore) drawn++
              else lost++
            })
            return { name, played: homeGames.length + awayGames.length, won, drawn, lost, goalsFor, goalsAgainst, points: won * 3 + drawn }
          })}
          playerTeam={selectedTeam}
          clWinner={(() => {
            const finalMatch = clMatches.find(m => m.round === 'final' && m.played)
            if (!finalMatch) return null
            return (finalMatch.homeScore || 0) >= (finalMatch.awayScore || 0) ? finalMatch.home : finalMatch.away
          })()}
          onPlayAgain={() => window.location.reload()}
        />
      )}
    </div>
  )
}
export default App
