library(lubridate)

# Read in the data scripted from 2010-2020/06
Crime_Incidents_in_2010 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2010.csv")
Crime_Incidents_in_2010$Year = 2010

Crime_Incidents_in_2011 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2011.csv")
Crime_Incidents_in_2011$Year = 2011

Crime_Incidents_in_2012 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2012.csv")
Crime_Incidents_in_2012$Year = 2012

Crime_Incidents_in_2013 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2013.csv")
Crime_Incidents_in_2013$Year = 2013

Crime_Incidents_in_2014 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2014.csv")
Crime_Incidents_in_2014$Year = 2014

Crime_Incidents_in_2015 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2015.csv")
Crime_Incidents_in_2015$Year = 2015

Crime_Incidents_in_2016 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2016.csv")
Crime_Incidents_in_2016$Year = 2016

Crime_Incidents_in_2017 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2017.csv")
Crime_Incidents_in_2017$Year = 2017

Crime_Incidents_in_2018 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2018.csv")
Crime_Incidents_in_2018$Year = 2018

Crime_Incidents_in_2019 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2019.csv")
Crime_Incidents_in_2019$Year = 2019

Crime_Incidents_in_2020 <- read.csv("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data/Crime_Incidents_in_2019.csv")
Crime_Incidents_in_2020$Year = 2020

dc_crime <- rbind(Crime_Incidents_in_2010,
                  Crime_Incidents_in_2011,
                  Crime_Incidents_in_2012,
                  Crime_Incidents_in_2013,
                  Crime_Incidents_in_2014,
                  Crime_Incidents_in_2015,
                  Crime_Incidents_in_2016,
                  Crime_Incidents_in_2017,
                  Crime_Incidents_in_2018,
                  Crime_Incidents_in_2019,
                  Crime_Incidents_in_2020)

# Check for missing reate for each column
sapply(dc_crime, function(x) sum(is.na(x)))

# Only keep interested columns in the dataframe
df = dc_crime[, (names(dc_crime) %in% c("CCN", "REPORT_DAT", "SHIFT", "METHOD", "OFFENSE", "WARD",
                                        "DISTRICT", "PSA", "NEIGHBORHOOD_CLUSTER",  "LATITUDE", 
                                        "LONGITUDE", "Year"))]

df_clean = na.omit(df)
# Check type of each column
str(df_clean)
# Correct the type of date
df_clean$WARD = as.factor(df_clean$WARD)
df_clean$DISTRICT = as.factor(df_clean$DISTRICT)
df_clean$REPORT_DAT = ymd_hms(df_clean$REPORT_DAT)   
df_clean$Month = month(ymd_hms(df_clean$REPORT_DAT))
df_clean$Day = day(ymd_hms(df_clean$REPORT_DAT))
str(df_clean)

setwd("F:/Data Science/Data Visualization/DATS 6401 - Final Project/Data")
write.csv(df_clean, file = "dc_crime_clean.csv")



