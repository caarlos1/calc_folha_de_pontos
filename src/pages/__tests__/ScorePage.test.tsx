import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ScorePage from '../ScorePage';

const getScoreCard = () => screen.getByTitle(/Calculadora de Folha de Pontos/i);

const getStartInput = (i = 1) =>
  screen.getByTitle(new RegExp(`Ponto Inicial: ${i}`, 'i'));

const getEndInput = (i = 1) =>
  screen.getByTitle(new RegExp(`Ponto Final: ${i}`, 'i'));

const getAddButton = (i = 2) =>
  screen.getByTitle(new RegExp(`Adicionar Linha ${i}`, 'i'));

const getDeleteButton = (i = 2) =>
  screen.getByTitle(new RegExp(`Remover Linha ${i}`, 'i'));

const getScoreTable = () => screen.getByTitle(/Tabela de Horas Totais/i);

const getTotalHours = () => screen.getByTitle(/Total de Horas Calculadas/i);

const getLineTotalHours = (i = 1) =>
  screen.getByTitle(new RegExp(`Total de Horas ${i}`, 'i'));

describe('<ScorePage />', () => {
  test('should render a card', () => {
    render(<ScorePage />);
    const card = getScoreCard();
    expect(card).toBeInTheDocument();
  });

  test('should render a score table', () => {
    render(<ScorePage />);
    const inputStart = getStartInput();
    const inputEnd = getEndInput();

    userEvent.type(inputStart, '01:00');
    userEvent.type(inputEnd, '01:30');

    const table = getScoreTable();
    const totalHours = getTotalHours();

    expect(table).toBeInTheDocument();
    expect(totalHours.textContent).toBe('00:30');
  });

  test('should calc correct score', () => {
    render(<ScorePage />);
    const inputStart = getStartInput();
    const inputEnd = getEndInput();

    userEvent.type(inputStart, '01:00');
    userEvent.type(inputEnd, '01:30');

    let totalHours = getTotalHours();
    expect(totalHours.textContent).toBe('00:30');

    userEvent.type(inputStart, '00:00');
    userEvent.type(inputEnd, '01:00');

    totalHours = getTotalHours();
    expect(totalHours.textContent).toBe('01:00');

    userEvent.type(inputStart, '01:00');
    userEvent.type(inputEnd, '00:00');

    totalHours = getTotalHours();
    expect(totalHours.textContent).toBe('23:00');

    userEvent.type(inputStart, '02:46');
    userEvent.type(inputEnd, '06:32');

    totalHours = getTotalHours();
    expect(totalHours.textContent).toBe('03:46');
  });

  test('should calc correct score with multiples lines', () => {
    render(<ScorePage />);
    // line 1
    let inputStart = getStartInput(1);
    let inputEnd = getEndInput(1);

    userEvent.type(inputStart, '06:00');
    userEvent.type(inputEnd, '09:40');

    let totalHours = getTotalHours();
    let lineTotalHours = getLineTotalHours(1);

    expect(lineTotalHours.textContent).toBe('03:40');
    expect(totalHours.textContent).toBe('03:40');

    let addButton = getAddButton(2);
    userEvent.click(addButton);

    // line 2
    inputStart = getStartInput(2);
    inputEnd = getEndInput(2);

    userEvent.type(inputStart, '11:30');
    userEvent.type(inputEnd, '13:30');

    addButton = getAddButton(3);
    userEvent.click(addButton);

    totalHours = getTotalHours();
    lineTotalHours = getLineTotalHours(2);

    expect(lineTotalHours.textContent).toBe('02:00');
    expect(totalHours.textContent).toBe('05:40');

    // line 3
    inputStart = getStartInput(3);
    inputEnd = getEndInput(3);

    userEvent.type(inputStart, '14:35');
    userEvent.type(inputEnd, '17:25');

    totalHours = getTotalHours();
    lineTotalHours = getLineTotalHours(3);

    expect(lineTotalHours.textContent).toBe('02:50');
    expect(totalHours.textContent).toBe('08:30');

    // add line to position 2
    addButton = getAddButton(2);
    userEvent.click(addButton);

    inputStart = getStartInput(2);
    inputEnd = getEndInput(2);

    userEvent.type(inputStart, '10:00');
    userEvent.type(inputEnd, '11:00');

    totalHours = getTotalHours();
    lineTotalHours = getLineTotalHours(2);

    expect(lineTotalHours.textContent).toBe('01:00');
    expect(totalHours.textContent).toBe('09:30');

    // delete line 2
    let deleteButton = getDeleteButton(2);
    userEvent.click(deleteButton);

    totalHours = getTotalHours();
    expect(totalHours.textContent).toBe('08:30');
  });
});
