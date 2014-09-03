

CREATE TYPE [dbo].[FixturesType] AS TABLE(
	[Country] [varchar](3) NOT NULL,
	[Div] [varchar](8) NOT NULL,
	[Year] [int] NOT NULL,
	[Date] [datetime] NOT NULL,
	[HomeTeam] [varchar](255) NOT NULL,
	[AwayTeam] [varchar](255) NOT NULL
)
GO


