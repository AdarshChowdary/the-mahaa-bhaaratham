// hooks/useQueries.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { getParvas } from '@/app/actions/parvas';
import { getSubParvas } from '@/app/actions/sub-parvas';
import { getSections } from '@/app/actions/sections';
import { getSections as getSectionDescription } from '@/app/actions/section-description';

// Define your return types for better type checking
interface Section {
  section_number: number;
  sub_parva_name: string;
}

interface SectionsResponse {
  sections: Section[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Hook for fetching Parvas
export function useParvas() {
    return useQuery({
      queryKey: ['parvas'],
      queryFn: async () => {
        const data = await getParvas();
        return JSON.parse(JSON.stringify(data));
      },
    });
  }

// Hook for fetching Sub Parvas
export function useSubParvas(parvaName: string) {
  return useQuery({
    queryKey: ['subParvas', parvaName],
    queryFn: () => getSubParvas(parvaName),
    enabled: !!parvaName,
  });
}

// Hook for fetching Sections
export function useSections(subParvaName: string, page: number = 1, pageSize: number = 10) {
  return useQuery<SectionsResponse, Error, SectionsResponse>({
    queryKey: ['sections', subParvaName, page, pageSize],
    queryFn: () => getSections(subParvaName, page, pageSize),
    enabled: !!subParvaName,
    placeholderData: keepPreviousData,
  });
}

// Hook for fetching Section Description
export function useSectionDescription() {
  return useQuery({
    queryKey: ['sectionDescription'],
    queryFn: getSectionDescription,
  });
}

// Hook for fetching a single section by number
export function useSectionByNumber(sectionNumber: number) {
  return useQuery({
    queryKey: ['sectionDescription', sectionNumber],
    queryFn: async () => {
      const data = await getSectionDescription();
      return data.find(section => section.section_number === sectionNumber) || null;
    },
    enabled: !!sectionNumber,
  });
}