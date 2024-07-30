import { describe, expect, test } from "vitest";
import { formatMonth, formatWeek, getDaysInMonth, getWeekDates } from "../utils.tsx";


describe('단위 테스트: 날짜 및 시간 관리', () => {
  describe('getDaysInMonth 함수', () => {
    test('주어진 월의 일 수를 정확히 반환한다', async () => {
      expect(getDaysInMonth(2024, 0)).toBe(31); // 1월
      expect(getDaysInMonth(2024, 2)).toBe(31); // 3월
      expect(getDaysInMonth(2024, 4)).toBe(31); // 5월
      expect(getDaysInMonth(2024, 6)).toBe(31); // 7월
      expect(getDaysInMonth(2024, 7)).toBe(31); // 8월
      expect(getDaysInMonth(2024, 9)).toBe(31); // 10월
      expect(getDaysInMonth(2024, 11)).toBe(31); // 12월

      // 30일인 달 테스트
      expect(getDaysInMonth(2024, 3)).toBe(30); // 4월
      expect(getDaysInMonth(2024, 5)).toBe(30); // 6월
      expect(getDaysInMonth(2024, 8)).toBe(30); // 9월
      expect(getDaysInMonth(2024, 10)).toBe(30); // 11월

      // 2월 테스트 (윤년과 평년)
      expect(getDaysInMonth(2024, 1)).toBe(29); // 윤년
      expect(getDaysInMonth(2023, 1)).toBe(28); // 평년
    });

    //윤년과 평년 테스트
    expect(getDaysInMonth(2020, 1)).toBe(29); // 윤년
    expect(getDaysInMonth(2100, 1)).toBe(28); // 100으로 나누어 떨어지는 해는 윤년이 아님
    expect(getDaysInMonth(2000, 1)).toBe(29); // 400으로 나누어 떨어지는 해는 윤년
  });

  describe('getWeekDates 함수', () => {
    describe('주어진 날짜가 속한 주의 모든 날짜를 반환한다', async () => {
      test('7개 날짜를 반환하는지 확인한다.', () => {
        const testDate = new Date('2023-07-26'); // 수요일
        const weekDates = getWeekDates(testDate);
        expect(weekDates).toHaveLength(7);
      });
    });
    describe('연도를 넘어가는 주의 날짜를 정확히 처리한다', async () => {
      test('7개 날짜를 반환하는지 확인한다.', () => {
        const testDate = new Date('2024-12-30'); //
        const weekDates = getWeekDates(testDate);
        expect(weekDates).toHaveLength(7);
      });
    });
  });

  describe('formatWeek 함수', () => {
    describe('주어진 날짜의 주 정보를 올바른 형식으로 반환한다.', async () => {
      test('2024년 1월 1일은 1주차로 반환되어야 함', () => {
        const date = new Date(2024, 0, 1); // 2024년 1월 1일
        expect(formatWeek(date)).toBe('2024년 1월 1주');
      });

      test('2024년 1월 7일은 1주차로 반환되어야 함', () => {
        const date = new Date(2024, 0, 7); // 2024년 1월 7일
        expect(formatWeek(date)).toBe('2024년 1월 1주');
      });

      test('2024년 1월 8일은 2주차로 반환되어야 함', () => {
        const date = new Date(2024, 0, 8); // 2024년 1월 8일
        expect(formatWeek(date)).toBe('2024년 1월 2주');
      });

      test('2024년 2월 15일은 3주차로 반환되어야 함', () => {
        const date = new Date(2024, 1, 15); // 2024년 2월 15일
        expect(formatWeek(date)).toBe('2024년 2월 3주');
      });

      test('2024년 12월 31일은 5주차로 반환되어야 함', () => {
        const date = new Date(2024, 11, 31); // 2024년 12월 31일
        expect(formatWeek(date)).toBe('2024년 12월 5주');
      });
    });
  });

  describe('formatMonth 함수', () => {
    describe('주어진 날짜의 월 정보를 올바른 형식으로 반환한다', async () => {
      test('2024년 1월은 올바르게 포맷되어야 함', () => {
        const date = new Date(2024, 0, 1); // 2024년 1월 1일
        expect(formatMonth(date)).toBe('2024년 1월');
      });

      test('2024년 12월은 올바르게 포맷되어야 함', () => {
        const date = new Date(2024, 11, 31); // 2024년 12월 31일
        expect(formatMonth(date)).toBe('2024년 12월');
      });

      test('2025년 6월은 올바르게 포맷되어야 함', () => {
        const date = new Date(2025, 5, 15); // 2025년 6월 15일
        expect(formatMonth(date)).toBe('2025년 6월');
      });

      test('2023년 2월은 올바르게 포맷되어야 함', () => {
        const date = new Date(2023, 1, 28); // 2023년 2월 28일
        expect(formatMonth(date)).toBe('2023년 2월');
      });

      test('2026년 10월은 올바르게 포맷되어야 함', () => {
        const date = new Date(2026, 9, 1); // 2026년 10월 1일
        expect(formatMonth(date)).toBe('2026년 10월');
      });
    });
  });

  describe('isDateInRange 함수', () => {
    describe('주어진 날짜가 특정 범위 내에 있는지 정확히 판단한다', async () => {
    });
  });
});
