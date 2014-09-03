
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

SET ANSI_PADDING ON
GO

CREATE TABLE [dbo].[Fixtures](
	[Country] [varchar](3) NOT NULL,
	[Div] [varchar](8) NOT NULL,
	[Year] [int] NOT NULL,
	[Date] [smalldatetime] NOT NULL,
	[HomeTeam] [varchar](255) NOT NULL,
	[AwayTeam] [varchar](255) NOT NULL,
	[LastUpdated] [datetime] NULL,
 CONSTRAINT [PK_Fixtures] PRIMARY KEY CLUSTERED 
(
	[Country] ASC,
	[Div] ASC,
	[Year] ASC,
	[Date] ASC,
	[HomeTeam] ASC,
	[AwayTeam] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]

GO

SET ANSI_PADDING OFF
GO

ALTER TABLE [dbo].[Fixtures] ADD  CONSTRAINT [DF_Fixtures_LastUpdated]  DEFAULT (getdate()) FOR [LastUpdated]
GO


