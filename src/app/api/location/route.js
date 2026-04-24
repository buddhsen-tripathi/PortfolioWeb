import { NextResponse } from "next/server";

const countryNames = new Intl.DisplayNames(["en"], { type: "region" });

export async function GET(request) {
  const city = request.headers.get("x-vercel-ip-city") || "";
  const countryCode = request.headers.get("x-vercel-ip-country") || "";
  const latitude = request.headers.get("x-vercel-ip-latitude") || "";
  const longitude = request.headers.get("x-vercel-ip-longitude") || "";

  let decodedCity = city ? decodeURIComponent(city) : "";
  let country = "";

  try {
    country = countryCode ? countryNames.of(countryCode) : "";
  } catch {
    country = countryCode;
  }

  let weather = null;

  if (latitude && longitude) {
    try {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m`,
        { next: { revalidate: 600 } }
      );
      if (res.ok) {
        const data = await res.json();
        weather = {
          temperature: Math.round(data.current.temperature_2m),
          unit: data.current_units.temperature_2m,
        };
      }
    } catch {}

    // If Vercel didn't provide the city, try reverse geocoding via Open-Meteo
    if (!decodedCity) {
      try {
        const geoRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m&timezone=auto`,
          { next: { revalidate: 600 } }
        );
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData.timezone) {
            // timezone is like "Asia/Kolkata" — use the city part as fallback
            const parts = geoData.timezone.split("/");
            decodedCity = parts[parts.length - 1].replace(/_/g, " ");
          }
        }
      } catch {}
    }
  }

  return NextResponse.json({
    city: decodedCity,
    country,
    weather,
  });
}
