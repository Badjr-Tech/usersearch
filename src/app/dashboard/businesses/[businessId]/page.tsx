import { notFound } from "next/navigation";
import * as businessActions from "@/app/dashboard/businesses/actions";
import { BusinessWithLocation } from "@/db/schema"; // Import BusinessWithLocation
import BusinessDetailClientPage from "./BusinessDetailClientPage"; // New import

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function BusinessDetailPage({ params }: { params: { businessId: string } & Promise<any> }) {
  console.log('--- BusinessDetailPage loaded for businessId:', params.businessId, '---');
  const businessId = parseInt(params.businessId);

  if (isNaN(businessId)) {
    notFound();
  }

  const business: BusinessWithLocation | null = await businessActions.getBusinessProfile(businessId); // Use the new type
  const availableDemographics = await businessActions.getAvailableDemographics(); // Fetch available demographics
  const availableLocations = await businessActions.getAvailableLocations(); // Fetch available locations

  if (!business) {
    notFound();
  }

  return <BusinessDetailClientPage initialBusiness={business} availableDemographics={availableDemographics} availableLocations={availableLocations} />;
}